import React from 'react';
import styles from './styles.module.css';

interface Props {}

const Loading: React.FC<Props> = ({}) => {
    return <span className={styles.loader}></span>;
};

export default Loading;
