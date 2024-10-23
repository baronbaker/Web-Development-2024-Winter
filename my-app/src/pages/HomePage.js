import React, { useState, useEffect } from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`/exercises/${_id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete exercise');
      }
      // Update exercises state after successful deletion
      setExercises(exercises.filter(exercise => exercise._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEdit = exercise => {
    setExercises(exercise);
    navigate("/edit-exercise");
  };
  
  const fetchData = async () => {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <main className="App-main">
      <h2>Exercise List</h2>
      <ExerciseTable exercises={exercises} onDelete={handleDelete} onEdit={handleEdit} />
    </main>
  );
};

export default HomePage;