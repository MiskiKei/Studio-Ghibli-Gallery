import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const FilmDetails = () => {
  const { id } = useParams(); // ID parameter from the URL
  const [film, setFilm] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
        setFilm(response.data);
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };

    fetchFilm();
  }, [id]);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div className="film-details">
      <h2>{film.title}</h2>
      <p><strong>Original Title:</strong> {film.original_title}</p>
      <p><strong>Original Title Romanised:</strong> {film.original_title_romanised}</p>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Producer:</strong> {film.producer}</p>
      <p><strong>Release Year:</strong> {film.release_date}</p>
      <p><strong>Run Time:</strong> {film.running_time} Minutes</p>
      <p><strong>Rating:</strong> {film.rt_score}/100</p>
      <p><strong>Description:</strong> {film.description}</p>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Gallery
        </button>
      </div>
    </div>
  );
};

export default FilmDetails;
