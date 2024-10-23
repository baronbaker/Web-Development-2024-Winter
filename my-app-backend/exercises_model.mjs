const mongoose = require('mongoose');
import "dotenv/config";

mongoose.set("sanitizeFilter", true);
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const mc = mongoose.connection;
mc.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
    date: { type: String, required: true, match: /^(((0)\d)|((1)[0-2]))(-)([0-2]\d|(3)[0-1])(-)\d{2}$/ }
});

const Exercise = mongoose.model("Exercise", exerciseShema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercises = Exercise(
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date
        });
    return exercises.save();
};

const findExerciseById = async (_id) => {
    const find = Exercise.findById(_id);
    return find.exec();
};

const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
};

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne(
        { _id: _id },
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date
        });
    return result;
};

const deleteExercise = async (_id) => {
    const del = await Exercise.deleteOne({ _id: _id });
    return del.deletedCount;
};

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise };