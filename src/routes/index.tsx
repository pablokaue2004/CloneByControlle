import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login/Login';
import VisãoGeral from 'pages/VisaoGeral';
import Financeiro from 'pages/Financeiro';
import AddAccount from 'pages/AddAccount';
import { useAuth } from 'context/AuthProvider/useAuth';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';

function AppRoutes() {
  const auth = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index element={<VisãoGeral />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/addAccount" element={<AddAccount />} />
      </Route>

      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
