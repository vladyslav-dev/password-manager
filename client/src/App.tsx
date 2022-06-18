import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AuthLayout from './layout/Authorization';
import Registration from './pages/Registration';
import DashboardLayout from './layout/Dashboard';
import NewPassword from './pages/NewPassword';
import useCheckAuth from './hooks/useCheckAuth';
import useFetchGlobalData from './hooks/useFetchGlobalData';
import EditPassword from './pages/EditPassword';

const App: React.FC = () => {

  const { isAuth } = useCheckAuth();
  const { isFetched, skipFetch } = useFetchGlobalData();

  return (
    <>
      {isAuth === null || (isFetched && skipFetch) ? (
        <div>Loading...</div>
      ) : isAuth ? (
        <DashboardLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/new-password" element={<NewPassword />} />
            <Route path="/dashboard/edit-password/:id" element={<EditPassword />} />
            <Route path="/dashboard/new-group" element={<Dashboard />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </DashboardLayout>
      ) : (
        <AuthLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </AuthLayout>
      )}
    </>
  );
}

export default App;
