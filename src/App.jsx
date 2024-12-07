import { BrowserRouter, Route, Routes } from 'react-router';

// Layouts
import { MainLayout } from './layouts/MainLayout';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TvSeriesPage from './pages/TvSeriesPage';
import BookmarkedPage from './pages/BookmarkedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="tv-series" element={<TvSeriesPage />} />
          <Route path="bookmarked" element={<BookmarkedPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
