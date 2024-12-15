import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; 
import movieAdapter from '../services/movieAdapter';
import { Movie, MoviesState } from '../types/movie';
 
const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalResults: 0,
};
 
export const getAllMovies = createAsyncThunk(
  'movies/getAllMovies',
  async (page: number) => { 
    const response = await movieAdapter.getMoviesBySearch('movie', page);
    if (response.Response === 'True') {
      return { movies: response.Search, totalResults: parseInt(response.totalResults, 10) };
    } else {
      throw new Error(response.Error);
    }
  }
);
 
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action: PayloadAction<{ movies: Movie[], totalResults: number }>) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setPage } = moviesSlice.actions;
export default moviesSlice.reducer;
