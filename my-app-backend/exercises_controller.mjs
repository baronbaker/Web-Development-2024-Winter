import express from "express";
import "dotenv/config";
import { body, validationResult } from "express-validator";
import * as exercises from "./exercises_model.mjs";


const PORT = process.env.PORT;
const app = express();

app.use(express.json());

// Post exercises
app.post("/exercises",   (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ Error: "Invalid request" });
        }

        exercises.createExercise(
            req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date
        )
            .then(exercise => {
                res.status(201).json(exercise);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: "Invalid request" });
            });
    });


// Get all exercises
app.get("/exercises", (req, res) => {
  let filter = {};
  exercises.findExercises(filter, "", 0)
      .then(exercises => {
          res.send(exercises);
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ Error: "Server Error" });
      });
});

// Get a single exercise by ID
app.get('/exercises/:id', async (req, res) => {
  exercises.findExerciseById(req.params._id)
        .then(exercise => {
            exercise !== null
                ? res.json(exercise)
                : res.status(404).json({ Error: "Not found" });
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

// Update an exercise by ID
app.put('/exercises/:id', async (req, res) => {
  const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ Error: "Invalid request" });
        }

        exercises.updateExercise(
            req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date
        )
            .then(number_updated => {
                number_updated.matchedCount ? number_updated.modifiedCount ? res.json({
                    _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date
                })
                : res.status(400).json({ Error: "Invalid Request" })
              : res.status(404).json({ Error: "Not found" });
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ Error: "Invalid request" });
            });
});

// Delete an exercise by ID
app.delete('/exercises/:id', async (req, res) => {
  exercises.deleteExercise(req.params._id)
        .then(deleted_count => {
            deleted_count === 1
                ? res.status(204).send()
                : res.status(404).json({ Error: "Not found" });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});