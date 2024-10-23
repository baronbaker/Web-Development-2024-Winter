import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";


function App() {

  const [editExercise, setExercise] = useState();
  return (
    <div className="App">
      <AppHeader />

      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditExercisePage />} />
          <Route path="/create" element={<CreateExercisePage />} />
        </Routes>
      </Router>
      <AppFooter />
    </div>
  );
}

export default App;
