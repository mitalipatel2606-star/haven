import { useMemo } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PropertyGrid from '../components/PropertyGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { properties } from '../data/properties.js';
import { useSearchFilters } from '../hooks/useSearchFilters.js';

function sortProperties(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case 'price-desc':
      return sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      // "Recommended" — a blend of rating and review volume, so a single
      // very small sample size doesn't outrank a well-reviewed favorite.
      return sorted.sort((a, b) => b.rating * Math.log(b.reviewCount + 1) - a.rating * Math.log(a.reviewCount + 1));
  }
}

export default function Home() {
  const { filters, setFilter, setFilters, clearFilters, activeFilterCount } = useSearchFilters();

  const results = useMemo(() => {
    const destination = filters.destination.trim().toLowerCase();
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const minRating = filters.minRating ? Number(filters.minRating) : null;
    const guestCount = filters.guests ? Number(filters.guests) : null;

    const filtered = properties.filter((property) => {
      if (destination) {
        const haystack = `${property.location} ${property.country} ${property.title}`.toLowerCase();
        if (!haystack.includes(destination)) return false;
      }
      if (filters.category !== 'All' && property.category !== filters.category) return false;
      if (maxPrice !== null && property.pricePerNight > maxPrice) return false;
      if (minRating !== null && property.rating < minRating) return false;
      if (guestCount !== null && property.guests < guestCount) return false;
      return true;
    });

    return sortProperties(filtered, filters.sort);
  }, [filters]);

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">Stays worth the drive</p>
          <h1 className="hero__title">Find a place with a story, not a floor plan.</h1>
          <p className="hero__subtitle">
            Cabins, cottages, and quiet corners from hosts who actually live nearby.
          </p>
          <SearchBar filters={filters} onSearch={setFilters} />
        </div>
      </section>

      <section className="results">
        <FilterBar
          filters={filters}
          onChange={setFilter}
          onClear={clearFilters}
          activeFilterCount={activeFilterCount}
          resultCount={results.length}
        />

        {results.length > 0 ? (
          <PropertyGrid properties={results} />
        ) : (
          <EmptyState
            icon="🗺️"
            title="No stays match those filters"
            message="Try widening your price range, clearing a filter, or searching a different destination."
            action={
              <button type="button" className="button button--primary" onClick={clearFilters}>
                Clear all filters
              </button>
            }
          />
        )}
      </section>
    </div>
  );
}
