import { nightsBetween } from './format.js';

/**
 * Validates a booking attempt against a property's constraints.
 * Returns an object keyed by field name -> error message.
 * An empty object means the booking is valid.
 */
export function validateBooking({ checkIn, checkOut, guests, maxGuests }) {
  const errors = {};

  if (!checkIn) {
    errors.checkIn = 'Pick a check-in date.';
  }

  if (!checkOut) {
    errors.checkOut = 'Pick a check-out date.';
  }

  if (checkIn && checkOut) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inDate = new Date(`${checkIn}T00:00:00`);
    const outDate = new Date(`${checkOut}T00:00:00`);

    if (inDate < today) {
      errors.checkIn = 'Check-in cannot be in the past.';
    }
    if (outDate <= inDate) {
      errors.checkOut = 'Check-out must be after check-in.';
    }
  }

  const guestCount = Number(guests);
  if (!guestCount || guestCount < 1) {
    errors.guests = 'Add at least 1 guest.';
  } else if (maxGuests && guestCount > maxGuests) {
    errors.guests = `This place fits up to ${maxGuests} guests.`;
  }

  return errors;
}

export function hasErrors(errorObject) {
  return Object.keys(errorObject).length > 0;
}

export { nightsBetween };
