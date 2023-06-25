import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import i18n from "i18next";
import { observer } from "mobx-react-lite";
import { initReactI18next } from "react-i18next";
import resources from "../../i18n.json";
import { Header } from "../Header/Header";
import { GameStore } from "../../store/GameStore";
import { Stone } from "../Stone/Stone";
import { Main } from "../Main/Main";
import { Controls } from "../Controls/Controls";
import { Letters } from "../Letters/Letters";
import styles from "./App.module.css";

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "old",
        interpolation: {
            escapeValue: false
        }
    });

export const gameStore = new GameStore();

export const App = observer(() => {
    const isVictory = gameStore.victoryModalOpen;

    const handleClose = () => {
        gameStore.victoryModalOpen = false;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.firstBlock}>
                <Header />
                <div className={styles.comment}>
                    Перед вами головоломка из журнала «Нева» 1898 года, показавшаяся мне достойной возрождения в интерактивном виде. Она достаточно сложная, так как для современного человека утерян её контекст. Но она щедро сдобрена подсказками, которые помогут вам её разгадать.
                </div>
                <Controls className={styles.controls} />
                <Stone className={styles.stone} />
                <Letters className={styles.letters} />
            </div>
            <Main className={styles.secondBlock} />
            <Dialog
                open={isVictory}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Поздравляю!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы разгадали головоломку!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});
