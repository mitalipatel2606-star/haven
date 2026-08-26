import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropertyGrid from '../components/PropertyGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { getPropertyById } from '../data/properties.js';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';

export default function Favorites() {
  const { favoriteIds } = useFavoritesContext();

  const savedProperties = useMemo(
    () => favoriteIds.map(getPropertyById).filter(Boolean),
    [favoriteIds]
  );

  return (
    <div className="page">
      <div className="page__heading">
        <h1>Saved stays</h1>
        <p>{savedProperties.length} of your favorites, kept right here in this browser.</p>
      </div>

      {savedProperties.length > 0 ? (
        <PropertyGrid properties={savedProperties} />
      ) : (
        <EmptyState
          icon="🤍"
          title="Nothing saved yet"
          message="Tap the heart on any stay to keep it here for later."
          action={
            <Link to="/" className="button button--primary">
              Browse stays
            </Link>
          }
        />
      )}
    </div>
  );
}
