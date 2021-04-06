import React from "react";
import styles from "./styles.module.scss";

export interface IValues {
  name: string;
  duration: string;
}

export interface IProps {
  handleSubmit: (values: IValues) => void;
}

export default function ChallengeCreationForm({ handleSubmit }: IProps) {
  const [name, setName] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({ name, duration });
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">What will be your daily challenge?</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="duration">For how many days?</label>
        <input
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button type="submit">Finish</button>
    </form>
  );
}
