import '../css/error_page.css';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {

    const location=useLocation()
    const{errorMessage}=location.state

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Oops!</h1>
        <p className="error-page-message">An error occurred: {errorMessage}</p>
        <p className="error-description">We apologize for the inconvenience. Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
