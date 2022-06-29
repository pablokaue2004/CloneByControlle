import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider/useAuth';

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */

const AuthGuard = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default AuthGuard;
