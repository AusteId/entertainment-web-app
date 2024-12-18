import React from 'react';
import "./BasicCard.css";
import { Bookmark } from "./Bookmark";
import RenderRating from './RenderRating';
import { useUserContext } from '../../service/UserContextProvider';
import { useRating } from './RatingHandler';

export const BasicCard = ({ Card }) => {
  const { userId } = useUserContext();
  const { rating, averageRating, isLoading, isError, handleRatingClick } = useRating(Card, userId);

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
              media="(min-width: 320px) and (max-width: 767px)"
              srcSet={Card.thumbnail.regular.small}
              alt="thumbnail"
            />
            <source
              media="(min-width: 768px) and (max-width: 1023px)"
              srcSet={Card.thumbnail.regular.medium}
              alt="thumbnail"
            />
            <img
              src={Card.thumbnail.regular.large}
              alt="thumbnail"
              className="rounded-md thumbnail-img hover-img"
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
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </svg>
            </li>
            <li className="body-s flex">
              {Card.category}
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none" className="oval-gap">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </svg>
            </li>
            <li className="body-s">{Card.rating}</li>
          </ul>

          <h2 className="heading-xs text-white font-medium font-outfit title-font">
            {Card.title}
            <span className={averageRating > 0 ? 'text-gray text-sm inline-flex items-center ml-2' : 'inline-flex items-center ml-2'}>
              {averageRating > 0 ? averageRating.toFixed(1) : ""}
              {averageRating > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="#FC4747"
                  className="ml-[0.2rem]"
                >
                  <path d="M6 9l-3 2 1-4-3-3h4l1-4 1 4h4l-3 3 1 4-3-2z" />
                </svg>
              )}
            </span>
          </h2>

          <div>
            <RenderRating rating={rating} onRatingChange={handleRatingClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
