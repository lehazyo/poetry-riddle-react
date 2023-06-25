import React from "react";
import styles from "./Letter.module.css";
import {Tooltip} from "@mui/material";
import cn from "classnames";

type TProps = {
    /** Displayed letter */
    letter: string,
    /** Letter is present in stone */
    inStone: boolean,
    /** Letter is used in answers to riddles */
    inRiddles: boolean,
}

/** Shows if letter is present in stone or in answers to riddles */
export const Letter = ({ letter, inStone, inRiddles }: TProps) => {
    if (!inStone && !inRiddles) {
        return null;
    }

    let tooltipText: string = "";
    if (inStone && inRiddles) {
        tooltipText = `Буква ${letter} использована вами на камне и в загадках`;
    } else {
        if (inStone) {
            tooltipText = `Буква ${letter} использована вами на камне, но не использована в загадках`;
        }
        if (inRiddles) {
            tooltipText = `Буква ${letter} использована вами в загадках, но не использована на камне`;
        }
    }

    return (
        <Tooltip title={tooltipText}>
            <div className={cn(styles.wrapper, { [styles.full]: inStone && inRiddles })}>
                <span className={styles.letter}>{letter}</span>
            </div>
        </Tooltip>
    )
};
