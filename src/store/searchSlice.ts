import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import movieAdapter from '../services/movieAdapter';
import { SearchedMoviesState } from '../types/movie';

const initialState: SearchedMoviesState = {
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalResults: 0,
};

export const searchMovies = createAsyncThunk(
  'searchedMovies/searchMovies',
  async ({ title, page }: { title: string, page: number }) => {
    console.log({title, page});
    
    if (!title.trim()) throw new Error('Search query cannot be empty');
    return await movieAdapter.getMoviesBySearch(title, page);
  }
);

const searchedMoviesSlice = createSlice({
  name: 'searchedMovies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.movies = [];
      state.error = null;
      state.currentPage = 1;
      state.totalResults = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults, 10);
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearSearchResults, setPage } = searchedMoviesSlice.actions;

export default searchedMoviesSlice.reducer;
