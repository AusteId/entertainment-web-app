import { useEffect, useState } from 'react';
import { apiGetAllMovies } from '../../api/movies';
import Button from '../shared/Button';
import { MovieInfo } from './MovieInfo';
import { Modal } from './Modal';
import { Search } from '../Search';

export const AdminView = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [movieId, setMovieId] = useState('');

  useEffect(() => {
    getAllMovies();
  }, [movieId]);

  const getAllMovies = async () => {
    const res = await apiGetAllMovies();
    setMovies(res.toReversed());
    setFilteredMovies(res.toReversed());
  };

  const onSearch = (searchStr) => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      )
    );
  };

  return (
    <div>
      {openForm && (
        <Modal
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={(movieId) => setMovieId(movieId)}
        />
      )}
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center px-2 md:px-3 lg:px-4 lg:mt-6">
        <h1 className="heading-lg p-0 m-0">Movies and TV Series</h1>
        <Button type={'button'} onClick={() => setOpenForm(true)}>
          + Add new
        </Button>
      </div>
      <div className="px-2 md:px-3 lg:px-4">
        {' '}
        <Search onSearch={onSearch} />
      </div>

      <div className="grid gap-3 grid-cols-2 px-2 md:grid-cols-3 md:px-3 lg:grid-cols-4 lg:px-4 py-3">
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <MovieInfo
              movie={movie}
              onDelete={(movieId) => setMovieId(movieId)}
              onEdit={(movieId) => setMovieId(movieId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
