import React, { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {IconButton, InputAdornment, TextField, Tooltip} from "@mui/material";
import { gameStore } from "../App/App";
import styles from "./Riddle.module.css";

type TProps = {
    label: string,
    index: number,
}

export const Riddle = observer(({ label, index }: TProps) => {
    const textFieldRef = React.useRef<HTMLInputElement | null>(null);

    const solved = gameStore.isRiddleSuggestionCorrect(index);
    const suggestion = gameStore.getSuggestion(index);
    const hint = gameStore.getRiddleHint(index);

    const requestHint = () => {
        gameStore.addRiddleHint(index, textFieldRef.current);
    };

    const setSuggestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        gameStore.setRiddleSuggestion(index, e.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.upper}>
                <div className={styles.number}>{index + 1}{')'}</div>
                <header className={styles.label}>{label}</header>
            </div>
            <div className={styles.inputWrapper}>
                <Tooltip placement="top" title={solved ? `Слово ${suggestion} верное` : ""}>
                    <TextField
                        className={styles.input}
                        InputProps={{
                            startAdornment: solved || hint === ""
                                ? null
                                : <InputAdornment position="start"><span>{hint}</span></InputAdornment>,
                            endAdornment: solved
                                ? (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" disabled>
                                            <CheckCircleOutlineIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                                : (
                                    <InputAdornment position="end">
                                        <Tooltip title="Подсказка: показать следующую букву в слове">
                                            <IconButton
                                                onClick={requestHint}
                                                edge="end"
                                            >
                                                <AutoAwesomeIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            readOnly: solved,
                        }}
                        size="small"
                        value={suggestion}
                        onChange={setSuggestion}
                        inputRef={textFieldRef}
                    />
                </Tooltip>
            </div>
        </div>
    )
});
