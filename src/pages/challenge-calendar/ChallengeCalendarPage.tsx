import React from 'react';
import Logo from '../../components/logo/Logo';
import classNames from './styles.module.scss';

const ChallengeCalendarPage: React.FC = () => {
    return (
        <header className={classNames.header}>
            <Logo />
            <button className={classNames.header__button}>Create new challenge</button>
        </header>
    );
};

export default ChallengeCalendarPage;
