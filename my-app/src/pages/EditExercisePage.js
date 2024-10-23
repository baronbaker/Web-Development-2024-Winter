import React from 'react';
import EditExerciseForm from '../components/EditExerciseForm';

function EditExercisePage({ editExercise }) {

  return (
    <main className= "App-main">
      <h2>Edit Exercise</h2>
      <EditExerciseForm editExercise={editExercise} />
    </main>
  );
};

export default EditExercisePage;