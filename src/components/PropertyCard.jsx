import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';
import { formatCurrency } from '../utils/format.js';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorited = isFavorite(property.id);

  const handleFavoriteClick = (event) => {
    // The button lives outside the <Link> in the DOM (see markup below) so
    // this never needs stopPropagation to avoid triggering navigation, but
    // preventDefault keeps a stray form/label behavior from interfering.
    event.preventDefault();
    toggleFavorite(property.id);
  };

  return (
    <article className="property-card">
      <Link to={`/property/${property.id}`} className="property-card__link">
        <div className="property-card__media">
          <img
            src={property.images[0]}
            alt=""
            loading="lazy"
            className="property-card__image"
          />
          <span className="property-card__category">{property.category}</span>
        </div>

        <div className="property-card__body">
          <div className="property-card__top-row">
            <h3 className="property-card__title">{property.title}</h3>
            <StarRating rating={property.rating} size="sm" />
          </div>
          <p className="property-card__location">
            {property.location}, {property.country}
          </p>
          <p className="property-card__meta">
            {property.guests} guests &middot; {property.bedrooms} bedrooms
          </p>
          <p className="property-card__price-tag">
            <span className="property-card__price-amount">
              {formatCurrency(property.pricePerNight)}
            </span>
            <span className="property-card__price-unit"> / night</span>
          </p>
        </div>
      </Link>

      <button
        type="button"
        className={`property-card__favorite${favorited ? ' property-card__favorite--active' : ''}`}
        onClick={handleFavoriteClick}
        aria-pressed={favorited}
        aria-label={favorited ? `Remove ${property.title} from saved` : `Save ${property.title}`}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M12 20.5s-7.5-4.6-10-9.3C0.4 8 1.7 4.5 5 3.4c2-0.7 4.2 0 5.6 1.8l1.4 1.8 1.4-1.8c1.4-1.8 3.6-2.5 5.6-1.8 3.3 1.1 4.6 4.6 3 7.8-2.5 4.7-10 9.3-10 9.3z"
            fill={favorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  );
}
