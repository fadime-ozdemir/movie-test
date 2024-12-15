import {   useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom'; 
import { AppDispatch, RootState } from '../store';
import { Movie } from '../types/movie';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import { searchMovies, setPage } from '../store/searchSlice';

const SearchResults: React.FC = () => {
  const { query } = useParams(); 
  
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, currentPage, totalResults } = useSelector(
    (state: RootState) => state.searchedMovies
  );

  useEffect(() => {
    if (query) {
      dispatch(searchMovies({title:query, page:currentPage})); 
    }
  }, [dispatch, currentPage, query]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  if (error) return <div>Error: {error}</div>;

  if (loading) return <div>Loading...</div>; 

  return (
    <div className="movies-container">
      <h1>Search Results for "{query}"</h1>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          movies.map((movie: Movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResults;
