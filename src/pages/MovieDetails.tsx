import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieAdapter from '../services/movieAdapter';
import { MovieDetail } from '../types/movieDetail';
import '../assets/styles/movieDetails.scss';

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (imdbID) {
                try {
                    setLoading(true);
                    const data = await movieAdapter.gethMovieByID(imdbID);

                    if (data.Response === 'True') {
                        setMovie(data);
                    } else {
                        setError(data.Error);
                    }
                } catch (err) {
                    setError('An error occurred while fetching the movie details.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    if (error) return <div className="error">Error: {error}</div>;
    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="movie-details-container">
            <div className="movie-details-header">
                <h1 className="movie-title">{movie?.Title}</h1>
            </div>
            <div className="movie-details-content">
                <div className="movie-poster">
                    <img src={movie?.Poster} alt={movie?.Title} className="poster-img" />
                </div>
                <div className="movie-info">
                    <p><strong>Summary:</strong> {movie?.Plot}</p>
                    <p><strong>Rating:</strong> {movie?.imdbRating}</p>
                    <p><strong>Actors:</strong> {movie?.Actors}</p>
                    <p><strong>Director:</strong> {movie?.Director}</p>
                    <p><strong>Producer:</strong> {movie?.Production}</p>
                </div>
            </div>
            <Link to="/" className="back-to-all-movies">Back to All Movies</Link>
        </div>
    );
};

export default MovieDetails;
