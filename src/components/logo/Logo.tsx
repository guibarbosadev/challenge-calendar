import React from 'react';
import styles from './styles.module.scss';

const Logo: React.FC = () => (
    <div className={styles.logo}>
        <div className={styles.logo__calendar}>
            <div className={styles.logo__calendar__month}>Jan</div>
            <div className={styles.logo__calendar__day}>01</div>
        </div>
        <h1 className={styles.logo__text}>Streak Calendar</h1>
    </div>
);

export default Logo;
