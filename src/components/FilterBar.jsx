import { CATEGORIES } from '../data/properties.js';

const PRICE_OPTIONS = [
  { label: 'Any price', value: '' },
  { label: 'Under $150', value: '150' },
  { label: 'Under $250', value: '250' },
  { label: 'Under $350', value: '350' },
];

const RATING_OPTIONS = [
  { label: 'Any rating', value: '' },
  { label: '4.5+', value: '4.5' },
  { label: '4.8+', value: '4.8' },
  { label: '4.9+', value: '4.9' },
];

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Highest rated', value: 'rating-desc' },
];

export default function FilterBar({ filters, onChange, onClear, activeFilterCount, resultCount }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__chips" role="group" aria-label="Filter by category">
        <button
          type="button"
          className={`chip${filters.category === 'All' ? ' chip--active' : ''}`}
          onClick={() => onChange('category', 'All')}
          aria-pressed={filters.category === 'All'}
        >
          All stays
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip${filters.category === category ? ' chip--active' : ''}`}
            onClick={() => onChange('category', category)}
            aria-pressed={filters.category === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="filter-bar__controls">
        <p className="filter-bar__count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'stay' : 'stays'}
        </p>

        <div className="filter-bar__selects">
          <label className="select-field">
            <span className="sr-only">Maximum price</span>
            <select value={filters.maxPrice} onChange={(e) => onChange('maxPrice', e.target.value)}>
              {PRICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span className="sr-only">Minimum rating</span>
            <select value={filters.minRating} onChange={(e) => onChange('minRating', e.target.value)}>
              {RATING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span className="sr-only">Sort by</span>
            <select value={filters.sort} onChange={(e) => onChange('sort', e.target.value)}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          {activeFilterCount > 0 && (
            <button type="button" className="filter-bar__clear" onClick={onClear}>
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
