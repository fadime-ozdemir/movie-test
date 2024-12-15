export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
  }

export interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalResults: number;
  }
  

export interface SearchedMoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;  
    currentPage: number;
    totalResults: number;
  }

export interface MovieCardProps {
    movie: Movie;
  }