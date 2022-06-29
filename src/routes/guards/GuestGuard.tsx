import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider/useAuth';

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default GuestGuard;
