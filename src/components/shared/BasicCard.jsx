import React, { useState, useEffect } from 'react';
import "./BasicCard.css";
import { Bookmark } from "./Bookmark";
import RenderRating from './RenderRating';
import { apiSetRating } from '../../api/movies'; // Импортируем функцию для обновления рейтинга

export const BasicCard = ({ Card }) => {
  const [rating, setRating] = useState(0);  // Рейтинг пользователя
  const [averageRating, setAverageRating] = useState(0);  // Средний рейтинг
  const [isLoading, setIsLoading] = useState(true);  // Стейт загрузки
  const [isError, setIsError] = useState(false);  // Стейт ошибки
  const [userId, setUserId] = useState(null); // Состояние для хранения userId

  // Получаем userId из localStorage (или другого хранилища)
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');  // Предполагаем, что userId сохранен в localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Устанавливаем userId из localStorage
    }
  }, []); // Этот useEffect выполнится только при монтировании компонента

  // Функция для расчета среднего рейтинга
  useEffect(() => {
    if (Card.ratings && Card.ratings.length > 0) {
      const totalRating = Card.ratings.reduce((acc, ratingObj) => {
        const ratingValues = Object.values(ratingObj);
        return acc + ratingValues[0];
      }, 0);
  
      const avgRating = totalRating / Card.ratings.length;
      setAverageRating(avgRating);  
    }
    setIsLoading(false);  
  }, [Card]);  

  const handleRatingClick = async (newRating) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    setRating(newRating);

    try {
      const updatedMovie = await apiSetRating(Card.id, userId, newRating);

      if (updatedMovie && updatedMovie.ratings) {
        const updatedRatings = updatedMovie.ratings;
        
        const totalRating = updatedRatings.reduce((acc, ratingObj) => {
          const ratingValues = Object.values(ratingObj);
          return acc + ratingValues[0];
        }, 0);

        const newAvgRating = totalRating / updatedRatings.length;  
        setAverageRating(newAvgRating);  
      } else {
        console.error('Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div key={Card.id}>
      <div className="relative">
        <Bookmark movieId={Card.id} bookmarks={Card.bookmarks} />
        <div className="relative group mb-2 bg-dark/25 cursor-pointer">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={Card.thumbnail.regular.small}
              alt="thumbnail"
            />
            <source
              media="(max-width: 1023px)"
              srcSet={Card.thumbnail.regular.medium}
              alt="thumbnail"
            />
            <source
              media="(min-width: 1024px)"
              srcSet={Card.thumbnail.regular.large}
              alt="thumbnail"
            />
            <img
              src={Card.thumbnail.regular.large}
              alt="thumbnail"
              className="rounded-md thumbnail-img lg:group-hover:brightness-50 duration-200"
            />
          </picture>
          <button
            className="absolute flex items-center opacity-0 group-hover:opacity-100 rounded-full 
            duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 desktop-only"
          >
            <svg
              className="play-image"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0
                15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                fill="#FFF"
              />
            </svg>
            <p className="heading-xs text-white font-outfit play-text">Play</p>
          </button>
        </div>
        <div className="list-text-color">
          <ul className="flex text-bs font-light font-outfit">
            <li className="body-s">{Card.year}</li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none" className="oval-gap">
                <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white" />
              </svg>
            </li>
            <li className="body-s flex">
              {Card.category}
            </li>
            <li>
              <RenderRating
                rating={rating}  
                onRatingChange={handleRatingClick}  
              />
            </li>
            <li className="body-s ml-1 text-white">
              {averageRating > 0 ? averageRating.toFixed(1) : "0"}
            </li>
          </ul>
        </div>
      </div>

      <h2 className="heading-xs text-white font-medium font-outfit title-font">
        {Card.title}
      </h2>
    </div>
  );
};
// Проверьте в консоли браузера, что userId действительно сохраняется
console.log(localStorage.getItem('userId'));  // Должно вывести актуальное значение userId
