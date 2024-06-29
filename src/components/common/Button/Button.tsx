import React from "react";

import styles from "./Button.module.css";

interface Button {
    type?: "button" | "submit";
    onClick?: () => void;
    red?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<Button> = ({ type = "button", onClick, red, children }) => {
    return (
        <button 
        type={type} 
        onClick={onClick} 
        className={`${styles.button} ${red && styles.redButton}`}>
            {children}
        </button>
    )
}

export default Button;

