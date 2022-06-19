import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { RootState } from '../store';
import { setAuth, setUser } from '../store/slices/auth';
import { IAuthResponse } from '../interfaces/auth';


export default function useCheckAuth() {

    const { isAuth } = useSelector((state: RootState) => state.authReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if (localStorage.getItem('password-manager:accessToken')) {

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
          })
      } else {
        dispatch(setAuth(false));

        navigate('/login');
      }
    }, [])

    return { isAuth };
}