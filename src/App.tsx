
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import MovieSearch from './pages/MovieSearch';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation' ;

import './assets/styles/themes.scss'; 

function App() { 
 

return <Provider store={store}>
<Router>
<Navigation />  
<Routes>
  <Route path="/" element={<Movies />} />
  <Route path="/movie/:imdbID" element={<MovieDetails />} />
  <Route path="/search/:query" element={<MovieSearch />} />
  <Route path="*" element={<NotFound />} />
</Routes>
</Router>
</Provider>
}

export default App
