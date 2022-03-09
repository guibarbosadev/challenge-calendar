import React from 'react';
import { Redirect } from 'react-router';
import { ERoutes } from '../../Router';
import ChallengeCreationPage from '../challenge-creation/ChallengeCreationPage';
import Loading from '../../components/loading/Loading';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { getChallenges } from '../../stores/challenge/challengeActions';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { challenges, didLoadChallenges, isLoading } = useAppSelector((state) => state.challenge);

    const getChallenges = () => {
        const shouldLoadChallenges = !didLoadChallenges;

        if (shouldLoadChallenges) {
            getChallenges();
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
