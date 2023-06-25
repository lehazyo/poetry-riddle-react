import React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { gameStore } from "../App/App";
import { Letter } from "../Letter/Letter";
import styles from "./Letters.module.css";

type TProps = {
    className: string,
}

export const Letters = observer(({ className }: TProps) => {
    const letters = gameStore.getUsedLetter();
    const lettersArray = Object.keys(letters);

    if (lettersArray.length === 0) {
        return null;
    }

    lettersArray.sort((a, b) => {
        if (a > b) {
            return 1;
        } else {
            if (a < b) {
                return -1;
            }
            return 0;
        }
    });

    return (
       <div className={cn(styles.wrapper, className)}>
           {lettersArray.map((letter) => (
               <Letter
                   key={letter}
                   letter={letter}
                   inStone={letters[letter].inStone}
                   inRiddles={letters[letter].inRiddles}
               />
           ))}
       </div>
    )
});