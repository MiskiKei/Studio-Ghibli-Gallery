import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

const FilmGallery = () => {
  const [films, setFilms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFilms, setFilteredFilms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ghibliapi.vercel.app/films');
        setFilms(response.data);
        setFilteredFilms(response.data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = films.filter(film =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFilms(results);
  }, [searchQuery, films]);

  return (
    <div className="film-gallery">
      <div className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="film-cards-container">
        {filteredFilms.map(film => (
          <div key={film.id} className="film-card">
            <h2>{film.title}</h2>
            <p><strong>Original Title:</strong> {film.original_title}</p>
            <p><strong>Director:</strong> {film.director}</p>
            <p><strong>Producer:</strong> {film.producer}</p>
            <p><strong>Release Year:</strong> {film.release_date}</p>
            <p><strong>Description:</strong> {film.description.length > 100 ? `${film.description.slice(0, 100)}...` : film.description}</p>
            {film.description.length > 100 && (
              <Link to={`/film/${film.id}`} className="read-more">Read More</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmGallery;

