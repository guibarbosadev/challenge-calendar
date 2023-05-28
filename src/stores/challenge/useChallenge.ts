import { useAppSelector } from '@stores/hooks';

const useChallenge = () => {
    const { challenges, didLoadChallenges } = useAppSelector((state) => state.challenge);

    return { challenges, didLoadChallenges };
};

export default useChallenge;
