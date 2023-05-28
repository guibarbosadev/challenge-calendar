import { useAppSelector } from '@stores/hooks';

const useAuth = () => {
    const { status, user } = useAppSelector((state) => state.auth);

    return { status, user };
};

export default useAuth;
