import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import fetchChallenges from '@stores/challenge/thunks/fetch-challenges.thunk';

const useChallenges = () => {
    const dispatch = useAppDispatch();
    const { challenges, didLoadChallenges, isLoading: isLoadingChallenges } = useAppSelector((state) => state.challenge);
    const { user, status: authStatus } = useAppSelector((state) => state.auth);
    const isLoading = isLoadingChallenges || authStatus === 'authenticating';

    useEffect(() => {
        const getChallenges = () => {
            const shouldLoadChallenges = !didLoadChallenges && Boolean(user);

            if (shouldLoadChallenges) {
                dispatch(fetchChallenges());
            }
        };

        getChallenges();
    }, [dispatch, didLoadChallenges, user]);

    return { challenges, didLoadChallenges, isLoading };
};

export default useChallenges;
