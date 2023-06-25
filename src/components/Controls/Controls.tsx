import React from "react";
import cn from "classnames";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";
import { Help } from "../Help/Help";
import styles from "./Controls.module.css";

type TProps = {
    className: string,
}

export const Controls = ({ className }: TProps) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <LanguageSwitch />
            <Help />
        </div>
    )
}