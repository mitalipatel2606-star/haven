function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="star-icon" aria-hidden="true" focusable="false">
      <path d="M10 1.5l2.59 5.24 5.78.84-4.18 4.08.99 5.76L10 14.77l-5.18 2.65.99-5.76L1.63 7.58l5.78-.84L10 1.5z" />
    </svg>
  );
}

export default function StarRating({ rating, reviewCount, size = 'md' }) {
  return (
    <span className={`star-rating star-rating--${size}`}>
      <StarIcon />
      <span className="star-rating__value">{rating.toFixed(2)}</span>
      {Number(rating) <= 2.5}?(<span>Low Rating</span>):(<span>High Rating</span>)
      {typeof reviewCount === 'number' && (
        <span className="star-rating__count">({reviewCount})</span>

      )}

    </span>
  );
}
