import React from 'react';

const RenderRating = ({ rating = 0, onRatingChange }) => {
  // Ensure rating is a valid number and is within the 0-5 range
  const ratingRounded = Math.min(5, Math.max(0, isNaN(rating) ? 0 : rating));

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill={i <= ratingRounded ? "#FC4747" : "#C0C0C0"} // Red stars for filled, gray for empty
        onClick={() => {
          if (onRatingChange) {
            onRatingChange(i); // Update the rating on click
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <path d="M6 9l-3 2 1-4-3-3h4l1-4 1 4h4l-3 3 1 4-3-2z" />
      </svg>
    );
  }

  return <div className="rating-stars flex flex-row items-center space-x-[0.20rem]">{stars}</div>;
};

export default RenderRating;
