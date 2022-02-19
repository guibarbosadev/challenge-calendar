import React from 'react';
import styles from './styles.module.scss';

export interface IValues {
    name: string;
}

export interface IProps {
    handleSubmit: (values: IValues) => void;
}

export default function ChallengeCreationForm({ handleSubmit }: IProps) {
    const [name, setName] = React.useState('');

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit({ name });
    };

    return (
        <form onSubmit={onSubmit}>
            <div className={styles.field}>
                <label htmlFor="name">Challenge yourself to do something daily</label>
                <input name="name" placeholder="E.g: Pratice german for 20 minutes" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit">Start!</button>
        </form>
    );
}
