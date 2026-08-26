import { useParams, Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery.jsx';
import StarRating from '../components/StarRating.jsx';
import BookingCard from '../components/BookingCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { getPropertyById } from '../data/properties.js';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = getPropertyById(id);
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  if (!property) {
    return (
      <div className="page">
        <EmptyState
          icon="🔍"
          title="We couldn't find that stay"
          message="It may have been removed, or the link might be incorrect."
          action={
            <Link to="/" className="button button--primary">
              Back to all stays
            </Link>
          }
        />
      </div>
    );
  }

  const favorited = isFavorite(property.id);

  return (
    <div className="page page--details">
      <div className="details">
        <div className="details__header">
          <div>
            <h1 className="details__title">{property.title}</h1>
            <div className="details__subrow">
              <StarRating rating={property.rating} reviewCount={property.reviewCount} />
              <span className="details__dot" aria-hidden="true">
                &middot;
              </span>
              <span>
                {property.location}, {property.country}
              </span>
            </div>
          </div>
          <button
            type="button"
            className={`favorite-pill${favorited ? ' favorite-pill--active' : ''}`}
            onClick={() => toggleFavorite(property.id)}
            aria-pressed={favorited}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M12 20.5s-7.5-4.6-10-9.3C0.4 8 1.7 4.5 5 3.4c2-0.7 4.2 0 5.6 1.8l1.4 1.8 1.4-1.8c1.4-1.8 3.6-2.5 5.6-1.8 3.3 1.1 4.6 4.6 3 7.8-2.5 4.7-10 9.3-10 9.3z"
                fill={favorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            {favorited ? 'Saved' : 'Save'}
          </button>
        </div>

        <ImageGallery images={property.images} title={property.title} />

        <div className="details__grid">
          <div className="details__main">
            <section className="details__section">
              <h2>
                {property.category} &middot; hosted by {property.host.name}
              </h2>
              <p className="details__facts">
                {property.guests} guests &middot; {property.bedrooms} bedrooms &middot; {property.beds}{' '}
                beds
              </p>
              {property.host.isSuperhost && <p className="details__superhost">★ Superhost</p>}
            </section>

            <section className="details__section">
              <p className="details__description">{property.description}</p>
            </section>

            <section className="details__section">
              <h2>What this place offers</h2>
              <ul className="amenities-list">
                {property.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </section>

            <section className="details__section details__host">
              <div className="details__host-avatar" aria-hidden="true">
                {property.host.name.charAt(0)}
              </div>
              <div>
                <h2>Hosted by {property.host.name}</h2>
                <p>Hosting since {property.host.joined}</p>
              </div>
            </section>
          </div>

          <BookingCard property={property} />
        </div>
      </div>
    </div>
  );
}
