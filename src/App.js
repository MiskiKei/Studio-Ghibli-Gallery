import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmGallery from './FilmGallery';
import FilmDetails from './FilmDetails'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Studio Ghibli Films</h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<FilmGallery />} />
          <Route path="/film/:id" element={<FilmDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
