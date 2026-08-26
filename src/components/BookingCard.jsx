import { useMemo, useState, useId } from 'react';
import { formatCurrency, formatDate, nightsBetween, pluralize } from '../utils/format.js';
import { validateBooking, hasErrors } from '../utils/validation.js';

const SERVICE_FEE_RATE = 0.12;

export default function BookingCard({ property }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  const pricing = useMemo(() => {
    const subtotal = nights * property.pricePerNight;
    const serviceFee = nights > 0 ? Math.round(subtotal * SERVICE_FEE_RATE) : 0;
    const cleaningFee = nights > 0 ? property.cleaningFee : 0;
    const total = subtotal + serviceFee + cleaningFee;
    return { subtotal, serviceFee, cleaningFee, total };
  }, [nights, property.pricePerNight, property.cleaningFee]);

  const handleReserve = (event) => {
    event.preventDefault();
    const validationErrors = validateBooking({
      checkIn,
      checkOut,
      guests,
      maxGuests: property.guests,
    });
    setErrors(validationErrors);

    if (!hasErrors(validationErrors)) {
      setConfirmation({
        checkIn,
        checkOut,
        guests,
        nights,
        total: pricing.total,
      });
    }
  };

  const handleCloseConfirmation = () => setConfirmation(null);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <aside className="booking-card" aria-labelledby="booking-heading">
      <div className="booking-card__header">
        <p className="booking-card__price">
          <span className="booking-card__price-amount">
            {formatCurrency(property.pricePerNight)}
          </span>
          <span className="booking-card__price-unit"> / night</span>
        </p>
        <span className="booking-card__rating">★ {property.rating.toFixed(2)}</span>
      </div>

      <h2 id="booking-heading" className="sr-only">
        Book this stay
      </h2>

      <form className="booking-card__form" onSubmit={handleReserve} noValidate>
        <div className="booking-card__dates">
          <div className="booking-card__field">
            <label htmlFor={checkInId}>Check-in</label>
            <input
              id={checkInId}
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              aria-invalid={Boolean(errors.checkIn)}
              aria-describedby={errors.checkIn ? `${checkInId}-error` : undefined}
            />
            {errors.checkIn && (
              <p className="field-error" id={`${checkInId}-error`}>
                {errors.checkIn}
              </p>
            )}
          </div>
          <div className="booking-card__field">
            <label htmlFor={checkOutId}>Check-out</label>
            <input
              id={checkOutId}
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              aria-invalid={Boolean(errors.checkOut)}
              aria-describedby={errors.checkOut ? `${checkOutId}-error` : undefined}
            />
            {errors.checkOut && (
              <p className="field-error" id={`${checkOutId}-error`}>
                {errors.checkOut}
              </p>
            )}
          </div>
        </div>

        <div className="booking-card__field booking-card__field--standalone">
          <label htmlFor={guestsId}>Guests</label>
          <input
            id={guestsId}
            type="number"
            min="1"
            max={property.guests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? `${guestsId}-error` : `${guestsId}-hint`}
          />
          {errors.guests ? (
            <p className="field-error" id={`${guestsId}-error`}>
              {errors.guests}
            </p>
          ) : (
            <p className="field-hint" id={`${guestsId}-hint`}>
              This place fits up to {property.guests} guests.
            </p>
          )}
        </div>

        <button type="submit" className="booking-card__submit">
          Reserve
        </button>

        {nights > 0 && (
          <div className="booking-card__breakdown">
            <div className="booking-card__row">
              <span>
                {formatCurrency(property.pricePerNight)} &times; {pluralize(nights, 'night')}
              </span>
              <span>{formatCurrency(pricing.subtotal)}</span>
            </div>
            <div className="booking-card__row">
              <span>Cleaning fee</span>
              <span>{formatCurrency(pricing.cleaningFee)}</span>
            </div>
            <div className="booking-card__row">
              <span>Service fee</span>
              <span>{formatCurrency(pricing.serviceFee)}</span>
            </div>
            <div className="booking-card__row booking-card__row--total">
              <span>Total</span>
              <span>{formatCurrency(pricing.total)}</span>
            </div>
          </div>
        )}

        <p className="booking-card__note">You won&rsquo;t be charged yet.</p>
      </form>

      {confirmation && (
        <div className="modal-overlay" role="presentation" onClick={handleCloseConfirmation}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__icon" aria-hidden="true">
              ✓
            </div>
            <h3 id="confirmation-title">Trip requested</h3>
            <p className="modal__property">{property.title}</p>
            <dl className="modal__details">
              <div>
                <dt>Dates</dt>
                <dd>
                  {formatDate(confirmation.checkIn)} &ndash; {formatDate(confirmation.checkOut)}
                </dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{pluralize(Number(confirmation.guests), 'guest')}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>{formatCurrency(confirmation.total)}</dd>
              </div>
            </dl>
            <p className="modal__footnote">
              This is a demo booking flow &mdash; no reservation has actually been made.
            </p>
            <button type="button" className="modal__close" onClick={handleCloseConfirmation}>
              Done
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
