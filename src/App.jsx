import { BrowserRouter, Route, Routes } from 'react-router';
import UserContextProvider from './service/UserContextProvider';

// Layouts
import { MainLayout } from './layouts/MainLayout';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TvSeriesPage from './pages/TvSeriesPage';
import BookmarkedPage from './pages/BookmarkedPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='movies' element={<MoviesPage />} />
            <Route path='tv-series' element={<TvSeriesPage />} />
            <Route path='bookmarked' element={<BookmarkedPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='admin' element={<AdminPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
