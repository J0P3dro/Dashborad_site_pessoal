import React from "react";

import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <h1>Dashboard</h1>
        </header>
    )
}

export default Header;

