import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { useEffect, useMemo } from 'react';
import { fetchUser } from '@stores/auth/thunks/fetch-user.thunk';

const useAuth = () => {
    const { status, user } = useAppSelector((state) => state.auth);
    const isLoggedIn = useMemo(() => status === 'authenticated', [status]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchLoggedInUser = () => {
            dispatch(fetchUser());
        };

        fetchLoggedInUser();
    }, [dispatch]);

    return { isLoggedIn, status, user };
};

export default useAuth;
