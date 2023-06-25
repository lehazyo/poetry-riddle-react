import React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Tooltip } from "@mui/material";
import { gameStore } from "../App/App";
import { InputHandler } from "../../classes/InputHandler";
import styles from "./StoneSlot.module.css";

type TProps = {
    className: string,
    index: number,
    icon: any,
    isSimilarToFocused: boolean,
    isConsonant: boolean,
}

export const StoneSlot = observer(({ className, index, icon, isSimilarToFocused, isConsonant }: TProps) => {
    const suggestion = gameStore.getStoneSuggestion(index);
    const isFocused = gameStore.getFocusedStoneLetterIndex() === index;
    const focusedStoneLetterIndex = gameStore.getFocusedStoneLetterIndex();
    const suggestionIsConsonant = InputHandler.isConsonant(suggestion);
    const hasError = suggestion !== "" && suggestionIsConsonant !== isConsonant;
    const isOpenHint = gameStore.openStoneHints[index];

    const [openAnimationAvailable, setOpenAnimationAvailable] = React.useState<boolean>(true);

    const playAnimation = isOpenHint && openAnimationAvailable;

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (index === focusedStoneLetterIndex && inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [focusedStoneLetterIndex]);

    React.useEffect(() => {
        if (isOpenHint) {
            setTimeout(() => {
                setOpenAnimationAvailable(false);
            }, 1000)
        }
    }, [isOpenHint]);

    let errorText = "";
    if (hasError) {
        errorText = isConsonant
            ? `Неправильно: по заданию тут согласная`
            : `Неправильно: по заданию тут гласная`
    }

    const iconNode = suggestion === "" && icon !== undefined ?
        <div className={styles.icon}>{React.createElement(icon)}</div>
        : null;

    const onKeyDown = (e: any) => {
        const key = e.key;
        if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(key)) {
            gameStore.moveFocus(key);
            return;
        }
        if (["Delete", "Backspace", "", " ", "Space"].includes(key)) {
            gameStore.setStoneSuggestion(index, "");
            return;
        }
        const refinedKey = InputHandler.engToRus(key);
        if (!/^[йцукенгшщзхъфывапролджэячсмитьбюѣ]$/i.test(refinedKey)) {
            return;
        }
        gameStore.setStoneSuggestion(index, refinedKey.toUpperCase());
    }

    const onBlur = () => {
        gameStore.unblurStone();
    }

    const onFocus = () => {
        gameStore.setFocusedStoneLetterIndex(index);
    }

    // To suppress error
    const onChange = () => { return; }

    return (
        <div className={cn(
            styles.wrapper,
            className,
            { [styles.focused]: isFocused },
            { [styles.similar]: isSimilarToFocused },
            { [styles.error]: hasError },
            { [styles.hintAnimation]: playAnimation },
            { [styles.openHint]: isOpenHint },
        )}>
            <Tooltip title={errorText}>
                <input
                    readOnly={isOpenHint}
                    className={styles.input}
                    value={suggestion}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ref={inputRef}
                />
            </Tooltip>
            {iconNode}
        </div>
    )
});
