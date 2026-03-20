'use client';

import styles from './GalaxyLoader.module.css';

export default function GalaxyLoader() {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['loader']}>
        <div className={styles['dot']} />
        <div className={styles['dot']} />
        <div className={styles['dot']} />
      </div>
    </div>
  );
}
