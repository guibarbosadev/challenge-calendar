import React from 'react';
import { Redirect } from 'react-router';
import { ERoutes } from '@models/routes';
import ChallengeCreationPage from '@pages/challenge-creation/ChallengeCreationPage';
import Loading from '@components/loading/Loading';
import styles from './styles.module.scss';
import useChallenges from '@stores/use-challenges';

const HomePage = () => {
    const { challenges, isLoading } = useChallenges();

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
