import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormInputValidation } from "react-form-input-validation";

function EditExerciseForm({ editExercise }) {

  function setDate(date) {
    const split_date = date.split("-");
    return `20${split_date[2]}-${split_date[0]}-${split_date[1]}`
  };

  const [data, errors, form] = useFormInputValidation(
        {
            name: editExercise.name, reps: editExercise.reps, weight: editExercise.weight, unit: editExercise.unit, date: setDate(editExercise.date)
        },
        {
            name: "required", reps: "required|numeric|digits_between:1,999999", weight: "required|numeric|digits_between:1,999", unit: "required", date: "required|date"
        }
    );

  const navigate = useNavigate();
  
  function formatDate(date) {
    const split_date = date.split("-");
    return `${split_date[1]}-${split_date[2]}-${split_date[0].substring(2, 4)}`
  };

  
  const updateExercise = async () => {
    const response = await fetch('/exercises${exerciseToEdit._id}',
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers:
        {
          "Content-Type": "application/json",
        },
      });
      response.status === 201
        ? alert("Successfully edited the exercise")
        : alert(`Failed to edit exercise. Status Code: ${response.status}`);
      navigate("/");
    };

  const handleSubmit = async (event) => {
    const is_valid = await form.validate(event);
    if (is_valid) {
      const new_date = formatDate(data.date);
      data.date = new_date;
      console.log("MAKE AN API CALL", data, errors, form);
      updateExercise();
    }
  }
  
   useEffect(() => {
     if (form.isValidForm) {
       const new_date = formatDate(data.date);
       data.date = new_date;
       console.log("MAKE AN API CALL ==> useEffect", data, errors, form);
       updateExercise();
     }
    }, []);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={data.name} onChange={form.handleChangeEvent}/>
      </div>
      <div>
        <label>Reps:</label>
        <input type="number" name="reps" value={data.reps} onChange={form.handleChangeEvent} />
      </div>
      <div>
        <label>Weight:</label>
        <input type="number" name="weight" value={data.weight} onChange={form.handleChangeEvent}/>
      </div>
      <div>
        <label>Unit:</label>
        <select name="unit" value={data.unit} onChange={form.handleChangeEvent}>
          <option value="kgs">kgs</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input type="text" name="date" value={data.date} onChange={form.handleChangeEvent}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditExerciseForm;