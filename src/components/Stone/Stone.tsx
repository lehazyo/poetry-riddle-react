import React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { gameStore } from "../App/App";
import { ReactComponent as Icon1 } from "../../img/letter1.svg";
import { ReactComponent as Icon2 } from "../../img/letter2.svg";
import { ReactComponent as Icon3 } from "../../img/letter3.svg";
import { ReactComponent as Icon4 } from "../../img/letter4.svg";
import { ReactComponent as Icon5 } from "../../img/letter5.svg";
import { ReactComponent as Icon6 } from "../../img/letter6.svg";
import { ReactComponent as Icon7 } from "../../img/letter7.svg";
import { ReactComponent as Icon8 } from "../../img/letter8.svg";
import { ReactComponent as Icon9 } from "../../img/letter9.svg";
import { ReactComponent as Icon10 } from "../../img/letter10.svg";
import { ReactComponent as Icon11 } from "../../img/letter11.svg";
import { ReactComponent as Icon12 } from "../../img/letter12.svg";
import { ReactComponent as Icon13 } from "../../img/letter13.svg";
import { ReactComponent as Icon14 } from "../../img/letter14.svg";
import { ReactComponent as Icon15 } from "../../img/letter15.svg";
import { ReactComponent as Icon16 } from "../../img/letter16.svg";
import { ReactComponent as Icon17 } from "../../img/letter17.svg";
import { ReactComponent as Icon18 } from "../../img/letter18.svg";
import { ReactComponent as Icon19 } from "../../img/letter19.svg";
import { ReactComponent as Icon20 } from "../../img/letter20.svg";
import { ReactComponent as Icon21 } from "../../img/letter21.svg";
import { ReactComponent as Icon22 } from "../../img/letter22.svg";
import stoneImg from "../../img/stone-bg.jpg";
import { StoneSlot } from "../StoneSlot/StoneSlot";
import { consonant, TLetterType, vowel } from "../../classes/InputHandler";
import styles from "./Stone.module.css";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

type TProps = {
    className: string,
}

/** Mapping of letter ids to icon ids */
const iconsByIds: Record<string, React.FC> = {
    1: Icon1,
    2: Icon2,
    3: Icon3,
    4: Icon4,
    5: Icon5,
    6: Icon6,
    7: Icon7,
    8: Icon8,
    9: Icon9,
    10: Icon10,
    11: Icon11,
    12: Icon12,
    13: Icon13,
    14: Icon14,
    15: Icon15,
    16: Icon16,
    17: Icon17,
    18: Icon18,
    19: Icon19,
    20: Icon20,
    21: Icon21,
    22: Icon22,
};

/** Mapping of letter strings to icon ids */
const lettersToIds: Record<string, number> = {
    "п": 1,
    "о": 2,
    "в": 3,
    "е": 4,
    "ѣ": 4,
    "р": 5,
    "ь": 6,
    "с": 7,
    "т": 8,
    "а": 9,
    "д": 10,
    "н": 11,
    "у": 12,
    "ж": 13,
    "м": 14,
    "ъ": 15,
    "и": 16,
    "ы": 17,
    "л": 18,
    "я": 19,
    "ч": 20,
    "г": 21,
    "з": 22,
};

const letterTypesByIds: Record<number, TLetterType> = {
    1: consonant,
    2: vowel,
    3: consonant,
    4: vowel,
    5: consonant,
    6: vowel,
    7: consonant,
    8: consonant,
    9: vowel,
    10: consonant,
    11: consonant,
    12: vowel,
    13: consonant,
    14: consonant,
    15: vowel,
    16: vowel,
    17: vowel,
    18: consonant,
    19: vowel,
    20: consonant,
    21: consonant,
    22: consonant,
};

export const Stone = observer(({ className }: TProps) => {
    const { t } = useTranslation();

    const languageAnswer = gameStore.getStoneAnswer();
    const focusedLetter = gameStore.getFocusedStoneLetter();

    const hintButton = gameStore.noMoreHints
        ? null
        : (
            <div className={styles.hintWrapper}>
                <Button onClick={() => { gameStore.openStoneHint(); }}>{t("Открыть не разгаданную букву")}</Button>
            </div>
        );

    const slotNodes = languageAnswer.reduce((acc: React.ReactElement[], answerLetter, index) => {
        if (answerLetter === null) {
            return acc;
        }
        const letterId = lettersToIds[answerLetter];
        acc.push(
            <StoneSlot
                key={index}
                className={styles.stone}
                isSimilarToFocused={answerLetter === focusedLetter}
                isConsonant={letterTypesByIds[letterId] === consonant}
                icon={iconsByIds[letterId]}
                index={index}
            />);
        return acc;
    }, []);

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={styles.inner}>
                <div className={styles.bgWrapper}>
                    <img className={styles.bgImg} src={stoneImg} alt="Камень" />
                </div>
                <div className={styles.letters}>
                    {slotNodes}
                </div>
            </div>
            {hintButton}
        </div>
    )
});
