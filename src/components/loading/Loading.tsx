import React from 'react';
import styles from './styles.module.scss';

const Loading = () => <div aria-live="polite" aria-busy="true" className={styles.loading} />;

export default Loading;
