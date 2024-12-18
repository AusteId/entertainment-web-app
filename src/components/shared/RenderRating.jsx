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
        width="20"  // Adjust width for a better size
        height="20"  // Adjust height for a better size
        viewBox="0 0 16 16"  // Adjust viewBox if the custom star design requires it
        fill={i <= ratingRounded ? "#FC4747" : "#C0C0C0"} // Red stars for filled, gray for empty
        onClick={() => {
          if (onRatingChange) {
            onRatingChange(i); // Update the rating on click
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {/* Custom Star Path (replace this with your new star design) */}
        <path d="M8 12l-3 2 1-4-3-3h4l1-4 1 4h4l-3 3 1 4-3-2z" />  {/* Example path */}
      </svg>
    );
  }

  return (
    <div className="rating-stars flex items-center">
      {stars}
    </div>
  );
};

export default RenderRating;
