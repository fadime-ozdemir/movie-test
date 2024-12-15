import React from 'react';
import { Link } from 'react-router-dom';
import { MovieCardProps } from '../types/movie';
import '../assets/styles/movieCard.scss';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card" key={movie.imdbID}>
      <div className="movie-card__image">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <Link to={`/movie/${movie.imdbID}`} className="movie-card__button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
