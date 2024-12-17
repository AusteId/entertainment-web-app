const RenderRating = ({ rating = 0, onRatingChange }) => {
  const ratingRounded = isNaN(rating) ? 0 : rating; // Если рейтинг не число, ставим 0
  
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill={i <= ratingRounded ? "#FC4747" : "#C0C0C0"} // Красные звезды для рейтинга, серые для пустых
        onClick={() => {
          if (onRatingChange) {
            onRatingChange(i); // Обновляем рейтинг
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
