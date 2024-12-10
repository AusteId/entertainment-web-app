import { useEffect, useState } from "react";
import bookmarkEmpty from "/assets/icon-bookmark-empty.svg";
import bookmarkFull from "/assets/icon-bookmark-full.svg";
import { useUserContext } from "../../service/UserContextProvider";
import { apiRemoveBookmark, apiSetBookmark } from "../../api/movies";

export const Bookmark = ({ movieId, bookmarks }) => {
  // iš čia gaunam userId
  const user = useUserContext();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    isBookmarked();
  }, []);

  // Patikrinam ar yra bookmarked filmų
  const isBookmarked = () => {
    if (bookmarks && bookmarks.includes(user.user)) {
      setBookmarked(true);
      return;
    } else {
      setBookmarked(false);
      return;
    }
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        // remove from bookmarks
        // ištrinam iš duomenų bazės bookmarks masvyo pagal user id
        const res = await apiRemoveBookmark(user.user, movieId);
        if (res.success) {
          setBookmarked(false);
        }
      } else {
        // set bookmarks
        // įrašom į bookmarks masyvą userio Id
        const res = await apiSetBookmark(user.user, movieId);
        if (res.success) {
          setBookmarked(true);
        }
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      setBookmarked((prev) => !prev);
  
    }
  };

  return (
    <div
      onClick={handleBookmark}
      className="absolute top-2 right-2 w-10 h-10 bg-dark/80
       rounded-full flex items-center justify-center opacity-70 cursor-pointer"
    >
      <img
        src={`${bookmarked ? bookmarkFull : bookmarkEmpty}`}
        alt="bookmark"
      />
    </div>
  );
};
