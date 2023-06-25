import React from "react";
import { Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./Help.module.css";

type TSections = "how-to" | "about";

export const Help: React.FC = () => {
    const { t } = useTranslation();

    const [ sectionOpen, setSectionOpen ] = React.useState<TSections | null>(null);

    const switchTab = (tab: TSections) => {
        setSectionOpen(sectionOpen === tab ? null : tab);
    };

    let openComponent = null;
    if (sectionOpen === "how-to") {
        openComponent = "Нажмите на символ на «камне» и введите букву, которая, по-вашему, подходит для этого места. Подсказки по заполнению находятся под «камнем».";
    }
    if (sectionOpen === "about") {
        openComponent = (
            <>
                <div>Загадка взята из&nbsp;журнала Нива 1898 года, её&nbsp;<a target="_blank" href="https://twitter.com/kederlone/status/1085966047847596033">опубликовал</a> в&nbsp;Твиттере пользователь @kederlone. Есть <a target="_blank" href="/poetry-riddle-react/img/Niva_scan.jpg">качественный скан</a> загадки из архива (оригинал можно найти в <a target="_blank" href="https://runivers.ru/lib/book9158/481192/">архиве журнала Нива</a>, выпуск №42, в PDF-файле страница 399.</div>
                <div>Текст на&nbsp;«камне» не&nbsp;содержит пробелов, переносов и&nbsp;знаков препинания. Знак «ять» (Ѣ), мягкий и&nbsp;твёрдый знаки считаются за гласные. «Ять» можно заменять на «е».</div>
            </>
        );
    }

    const textNode = openComponent === null ? null : <Paper elevation={3} className={styles.text}>{openComponent}</Paper>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                <Button variant={sectionOpen === "how-to" ? "outlined" : "text"} onClick={() => { switchTab("how-to") }}>{t("Как играть")}</Button>
                <span className={styles.divider}>•</span>
                <Button variant={sectionOpen === "about" ? "outlined" : "text"} onClick={() => { switchTab("about") }}>{t("О загадке")}</Button>
            </div>
            {textNode}
        </div>
    );
};
