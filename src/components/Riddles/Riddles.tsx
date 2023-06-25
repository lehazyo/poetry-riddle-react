import React from "react";
import { useTranslation } from "react-i18next";
import { Riddle } from "../Riddle/Riddle";
import { AlphabeticWarning } from "../AlphabeticWarning/AlphabeticWarning";
import styles from "./Riddles.module.css";

export const Riddles = () => {
    const { t } = useTranslation();

    const riddles: string[] = [
        "Помещение для весов.",
        "Насыпь в топком месте.",
        "Нота.",
        "Известный философ.",
        "Дерево.",
        "Время года.",
        "Материал для письма у древних.",
        "Хищный зверь.",
        "Пространство, поросшее травой.",
        "Корабельная мера.",
        "Название славянского бога.",
        "Болезнь.",
    ];

    const riddleColumns = [];
    const half = riddles.length / 2;
    for (let i = 0; i < 2; i++) {
        const currentColumn = [];
        for (let j = 0; j < half; j++) {
            const index = (i * half) + j;
            const title = riddles[index];
            currentColumn.push(<Riddle key={title} label={t(title)} index={index} />);
        }

        riddleColumns.push(
            <div key={i} className={styles.column}>
                {currentColumn}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.columns}>
                {riddleColumns}
            </div>
            <AlphabeticWarning />
        </div>
    )
};
