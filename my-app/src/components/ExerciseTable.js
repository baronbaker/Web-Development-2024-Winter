import React from 'react';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';

const ExerciseTable = ({ exercises, handleDelete, handleEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <tr key={exercise._id}>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
              <button onClick={() => handleDelete(exercise._id)}><RiDeleteBin6Line /></button>
              <button onClick={() => handleEdit(exercise._id)}><RiEditLine /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseTable;