import React from 'react';
import Logo from '../../components/logo/Logo';
import { useAppSelector } from '../../stores/hooks';
import classNames from './styles.module.scss';
import Select from 'react-select';

const ChallengeCalendarPage: React.FC = () => {
    const { challenges } = useAppSelector((state) => state.challenge);
    const options = challenges.map((challenge) => ({
        value: challenge.id,
        label: challenge.name
    }));
    const [firstOption] = options;
    const [selectedOption, setSelectedOption] = React.useState(firstOption);

    return (
        <>
            <header className={classNames.header}>
                <Logo />
                <button className={classNames.header__button}>Create new challenge</button>
            </header>
            <main className={classNames.body}>
                <Select
                    className={classNames.select}
                    value={selectedOption}
                    options={options}
                    onChange={(option) => option && setSelectedOption(option)}
                    isSearchable={false}
                />
            </main>
        </>
    );
};

export default ChallengeCalendarPage;
