import React from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { ERoutes } from '../../Router';
import { useChallengeStore } from '../../stores/ChallengeStore';
import ChallengeCreationPage from '../challenge-creation/ChallengeCreationPage';
import Loading from '../../components/loading/Loading';
import styles from './styles.module.scss';

const HomePage = observer(() => {
    const challengeStore = useChallengeStore();
    const { challenges, didLoadChallenges } = challengeStore;
    const [isLoading, setIsLoading] = React.useState(!challengeStore.didLoadChallenges);

    const getChallenges = () => {
        const shouldLoadChallenges = !didLoadChallenges;
        const getChallenges = async () => {
            setIsLoading(true);
            await challengeStore.getChallenges();
            setIsLoading(false);
        };

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
});

export default HomePage;
