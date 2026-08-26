import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';

export default function NotFound() {
  return (
    <div className="page">
      <EmptyState
        icon="🧭"
        title="This page wandered off"
        message="The page you're looking for doesn't exist."
        action={
          <Link to="/" className="button button--primary">
            Back to Fernway
          </Link>
        }
      />
    </div>
  );
}
