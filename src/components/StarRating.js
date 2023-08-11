import { useState } from "react";

const StarRating = ({ rating }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  // Map the 10-point scale onto a 5-star rating
  const starRating = Math.round(rating / 2);

  // Create an array of 5 star elements
  const stars = [...Array(5)].map((_, index) => {
    const ratingValue = index + 1;
    const filled = (hoveredRating || starRating) >= ratingValue;
    return (
      <span
        key={ratingValue}
        className={`star ${filled ? "filled" : ""}`}
        onMouseEnter={() => setHoveredRating(ratingValue)}
        onMouseLeave={() => setHoveredRating(null)}
        onClick={() => console.log(`You clicked on star ${ratingValue}`)}>
        &#9733;
      </span>
    );
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
