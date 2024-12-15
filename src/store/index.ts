import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice'; 
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    searchedMovies:searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
