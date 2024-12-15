import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { getAllMovies, setPage } from '../store/moviesSlice';
import { AppDispatch, RootState } from '../store';
import { Movie } from '../types/movie';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';

const Movies: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate=useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const { movies, loading, error, currentPage, totalResults } = useSelector(
      (state: RootState) => state.movies
    );
   
    useEffect(() => {
      dispatch(getAllMovies(currentPage));
    }, [dispatch, currentPage]);
  
    const totalPages = Math.ceil(totalResults / 10);  
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        dispatch(setPage(page)); 
      }
    };
   
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`/search/${searchTerm}`);
    };

    if (error) return <div>Error: {error}</div>;

    if (loading) return <div>Loading...</div>; 

    return (
      <div className="movies-container">
        <h1>All Movies</h1>
 
        <form className="search-bar-container" onSubmit={handleSearch}>
          <input
            className="search-box" 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
          />
          <button type="submit">Search</button>
        </form>
        <div className="movie-list">
          {movies.map((movie:Movie) => ( 
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
    );
  };
  
  export default Movies