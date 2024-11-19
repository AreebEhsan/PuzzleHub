import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>We couldn't find the page you were looking for.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

export default NotFound;
