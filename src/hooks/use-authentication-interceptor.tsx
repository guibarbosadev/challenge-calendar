import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { apiClient } from '@services/base';
import { useAppDispatch } from '@stores/hooks';
import { logout } from '@stores/auth/thunks/logout.thunk';

const useAuthenticationInterceptor = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interceptor = apiClient.interceptors.response.use(
            (response) => response,
            (error) => {
                const isAuthenticationError = error.response?.status === StatusCodes.UNAUTHORIZED;

                if (isAuthenticationError) {
                    dispatch(logout());
                    history.push('/login');
                }

                return Promise.reject(error);
            }
        );

        const removeInterceptor = () => {
            apiClient.interceptors.response.eject(interceptor);
        };

        return removeInterceptor;
    }, [history]);

    return null;
};

export default useAuthenticationInterceptor;
