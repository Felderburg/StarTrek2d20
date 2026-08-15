import { Spinner } from 'react-bootstrap';

export const LoadingSpinnerView = () => {
  return (
    <div className="mt-4 text-center">
      <Spinner animation="border" className="text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
