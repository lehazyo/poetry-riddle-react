import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

export const Header = () => {
    const { t } = useTranslation();

    return (
        <header className={styles.wrapper}>
            <h2>{t("Задача и ребус")}</h2>
            <h1>{t("НА ПРЕМИИ.")}</h1>
        </header>
    )
};
