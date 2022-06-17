import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from './services/AuthService';
import { RootState } from './store';
import { setAuth, setUser } from './store/slices/auth';
import { useNavigate, Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AuthLayout from './layout/Authorization';
import Registration from './pages/Registration';
import { IAuthResponse } from './types/auth';

const App: React.FC = () => {

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.authReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("password-manager:accessToken")) {

      AuthService.checkAuth()
        .then((data: IAuthResponse) => {

          dispatch(setAuth(true));
          dispatch(setUser(data?.user));

          localStorage.setItem('password-manager:accessToken', data?.accessToken);

          navigate('/dashboard');
        })
        .catch(() => {

          localStorage.removeItem('password-manager:accessToken');
          dispatch(setAuth(false));

          navigate('/login');

          console.warn('Token is not define, Unauthorized')
        })
    } else {
      dispatch(setAuth(false));
      console.warn('Token is not define, Unauthorized')
    }
  }, [])

  return (
    <>
      {isAuth === null ? (
        <div>Loading...</div>
      ) : isAuth ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
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
