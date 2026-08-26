import { NavLink } from 'react-router-dom';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';

export default function Navbar() {
  const { favoriteCount } = useFavoritesContext();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand" aria-label="Fernway home">
          <span className="navbar__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <path
                d="M16 2C10 8 6 14 6 19a10 10 0 0020 0c0-5-4-11-10-17z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M16 9v18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="navbar__wordmark">Fernway</span>
        </NavLink>

        <nav className="navbar__nav" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
          >
            Explore
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
          >
            Saved
            {favoriteCount > 0 && (
              <span className="navbar__badge" aria-label={`${favoriteCount} saved stays`}>
                {favoriteCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
