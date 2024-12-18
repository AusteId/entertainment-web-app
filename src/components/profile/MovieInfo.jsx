import { MdDeleteForever } from 'react-icons/md';
import { apiDeleteMovie } from '../../api/movies';
import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import { EditModal } from './EditModal';

export const MovieInfo = ({ movie, onDelete, onEdit }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async () => {
    const res = await apiDeleteMovie(movie.id);
    if (res.error) {
      console.log(error);
    } else {
      onDelete(res.id);
    }
  };

  return (
    <>
      {openEdit && (
        <EditModal
          movie={movie}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSave={(movieId) => onEdit(movieId)}
        />
      )}
      <div className="flex flex-col gap-1">
        <div className="relative">
          <img
            className="rounded-lg"
            src={movie.thumbnail.regular.medium}
            alt={movie.title}
          />
          <div
            onClick={handleDelete}
            className="w-10 h-10 rounded-full bg-dark bg-opacity-70 hover:bg-opacity-100 hover:bg-white absolute cursor-pointer p-2 top-2 right-2"
          >
            <MdDeleteForever className="text-red" size={24} />
          </div>
          <div
            onClick={() => setOpenEdit(true)}
            className="w-10 h-10 rounded-full bg-dark bg-opacity-70 hover:bg-opacity-100 hover:bg-white absolute cursor-pointer p-2 top-2 left-2"
          >
            <FaRegEdit className="text-red" size={24} />
          </div>
        </div>

        <h2 className="heading-md">{movie.title}</h2>
        <p className="body-sm">
          <span>{movie.rating}</span> <span>{movie.year}</span>
        </p>
      </div>
    </>
  );
};
