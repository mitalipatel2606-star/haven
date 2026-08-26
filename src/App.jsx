import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

// Home is the landing page nearly every visitor hits first, so it loads
// eagerly. Details and Favorites are one navigation away, so they're
// split into their own chunks and fetched on demand.
const PropertyDetails = lazy(() => import('./pages/PropertyDetails.jsx'));
const Favorites = lazy(() => import('./pages/Favorites.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      Loading&hellip;
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}
