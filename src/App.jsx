import { BrowserRouter, Route, Routes } from 'react-router';

// Layouts
import { MainLayout } from './layouts/MainLayout';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import MoviesPage from './pages/MoviesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="movies" element={<MoviesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
