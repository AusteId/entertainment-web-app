import { useState, useEffect } from 'react';
import { apiSetRating } from '../../api/movies'; // Import function for updating the rating

export const useRating = (Card, userId) => {
  const [rating, setRating] = useState(0);  // User rating
  const [averageRating, setAverageRating] = useState(0);  // Average rating
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [isError, setIsError] = useState(false);  // Error state

  // Function for calculating the average rating
  useEffect(() => {
    // Ensure that Card.ratings exists and has items
    if (Card.ratings && Card.ratings.length > 0) {
      const totalRating = Card.ratings.reduce((acc, ratingObj) => {
        return acc + ratingObj.rating;
      }, 0);

      const avgRating = totalRating / Card.ratings.length;
      setAverageRating(avgRating);
    } else {
      setAverageRating(0);  // Default to 0 if no ratings
    }

    setIsLoading(false);

    // Get the current user's rating from the API (if available)
    const userRating = Card.ratings.find(ratingObj => ratingObj.userId === userId);
    if (userRating) {
      setRating(userRating.rating);  // Set the user rating from the API data
    }
  }, [Card, userId]);  // Dependencies to track changes in Card or userId

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
          return acc + ratingObj.rating;
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

  return { rating, averageRating, isLoading, isError, handleRatingClick };
};
