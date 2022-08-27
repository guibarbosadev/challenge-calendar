import React from 'react';
import { Redirect } from 'react-router';
import { ERoutes } from '@models/routes';
import ChallengeCreationPage from '@pages/challenge-creation/ChallengeCreationPage';
import Loading from '@components/loading/Loading';
import fetchChallenges from '@stores/challenge/thunks/fetch-challenges.thunk';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@stores/hooks';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { challenges, didLoadChallenges, isLoading } = useAppSelector((state) => state.challenge);

    const getChallenges = () => {
        const shouldLoadChallenges = !didLoadChallenges;

        if (shouldLoadChallenges) {
            dispatch(fetchChallenges());
        }
    };

    React.useEffect(getChallenges, []);

    return isLoading ? (
        <div className={styles.container}>
            <Loading />
        </div>
    ) : challenges.length > 0 ? (
        <Redirect to={ERoutes.Calendar} />
    ) : (
        <ChallengeCreationPage />
    );
};

export default HomePage;
