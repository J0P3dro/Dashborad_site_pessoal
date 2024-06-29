import React from "react";

import styles from "./Title.module.css";

interface TitleProps{
    children: React.ReactNode;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
    return (
        <h1 className={className}>{children}</h1>
    )
}

export default Title;


