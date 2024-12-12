import { useEffect, useState } from 'react';
import { useUserContext } from '../../service/UserContextProvider';
import { apiRemoveBookmark, apiSetBookmark } from '../../api/movies';
import bookmarkEmpty from '/assets/icon-bookmark-empty.svg';
import bookmarkFull from '/assets/icon-bookmark-full.svg';
 
export const Bookmark = ({ movieId, bookmarks }) => {
  const userData = useUserContext();
  const [bookmarked, setBookmarked] = useState(false);
 
  useEffect(() => {
    isBookmarked();
  }, []);
 
  // Patikrinam ar yra bookmarked filmų
  const isBookmarked = () => {
    if (bookmarks && bookmarks.includes(userData.userId)) {
      setBookmarked(true);
      return;
    } else {
      setBookmarked(false);
      return;
    }
  };
 
  const handleBookmark = async () => {
    if (bookmarked) {
      // ištrinam iš duomenų bazės bookmarks masvyo pagal user id
      const res = await apiRemoveBookmark(userData.userId, movieId);
      userData.setUnBookmark(movieId);
      setBookmarked(false);
    } else {
      // įrašom į bookmarks masyvą userio Id
      const res = await apiSetBookmark(userData.userId, movieId);
      setBookmarked(true);
    }
  };
  return (
    <div
      onClick={handleBookmark}
      className='absolute top-2 right-2 w-10 h-10 bg-lightBlue rounded-full flex items-center justify-center opacity-70 cursor-pointer z-50'
    >
      <img
        src={`${bookmarked ? bookmarkFull : bookmarkEmpty}`}
        alt='bookmark'
      />
    </div>
  );
};
 
 
