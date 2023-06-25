import React from "react";
import { Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import WarningIcon from "@mui/icons-material/Warning";
import { gameStore } from "../App/App";
import styles from "./AlphabeticWarning.module.css";

export const AlphabeticWarning = observer(() => {
    if (gameStore.suggestionsOrderedAlphabetically()) {
        return null;
    }

    return (
        <Paper elevation={3} className={styles.wrapper}>
            <WarningIcon style={{ color: "#dd2" }} />
            <span>Ответы на загадки не следуют в алфавитном порядке, как того требуют условия задачи</span>
        </Paper>
    )
});
