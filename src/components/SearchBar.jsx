import { useState, useEffect, useId } from 'react';

export default function SearchBar({ filters, onSearch }) {
  const [draft, setDraft] = useState({
    destination: filters.destination,
    checkIn: filters.checkIn,
    checkOut: filters.checkOut,
    guests: filters.guests,
  });

  const destinationId = useId();
  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();

  // Keep the draft in sync if filters change from outside (e.g. Clear all,
  // or the browser back/forward button changing the URL).
  useEffect(() => {
    setDraft({
      destination: filters.destination,
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      guests: filters.guests,
    });
  }, [filters.destination, filters.checkIn, filters.checkOut, filters.guests]);

  const handleChange = (field) => (event) => {
    setDraft((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(draft);
  };

  return (
    <form className="search-ticket" onSubmit={handleSubmit} role="search" aria-label="Search stays">
      <div className="search-ticket__field search-ticket__field--grow">
        <label htmlFor={destinationId}>Destination</label>
        <input
          id={destinationId}
          type="text"
          placeholder="Where to?"
          value={draft.destination}
          onChange={handleChange('destination')}
          autoComplete="off"
        />
      </div>

      <span className="search-ticket__perf" aria-hidden="true" />

      <div className="search-ticket__field">
        <label htmlFor={checkInId}>Check-in</label>
        <input id={checkInId} type="date" value={draft.checkIn} onChange={handleChange('checkIn')} />
      </div>

      <span className="search-ticket__perf" aria-hidden="true" />

      <div className="search-ticket__field">
        <label htmlFor={checkOutId}>Check-out</label>
        <input id={checkOutId} type="date" value={draft.checkOut} onChange={handleChange('checkOut')} />
      </div>

      <span className="search-ticket__perf" aria-hidden="true" />

      <div className="search-ticket__field search-ticket__field--narrow">
        <label htmlFor={guestsId}>Guests</label>
        <input
          id={guestsId}
          type="number"
          min="1"
          placeholder="Add"
          value={draft.guests}
          onChange={handleChange('guests')}
        />
      </div>

      <button type="submit" className="search-ticket__submit">
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}
