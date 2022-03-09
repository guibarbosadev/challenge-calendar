import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from './styles.module.scss';

export interface IValues {
    name: string;
}

export interface IProps {
    onSubmit: (values: IValues) => void;
}

export default function ChallengeCreationForm({ onSubmit }: IProps) {
    const { register, handleSubmit, formState } = useForm<IValues>({ mode: 'onChange' });
    const { isValid } = formState;
    const isInvalid = !isValid;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames.field}>
                <label htmlFor="name">Challenge yourself to do something daily</label>
                <input placeholder="E.g: Pratice german for 20 minutes" {...register('name', { required: true })} />
            </div>
            <button type="submit" disabled={isInvalid}>
                Start!
            </button>
        </form>
    );
}
