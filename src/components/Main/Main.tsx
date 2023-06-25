import React from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Riddles } from "../Riddles/Riddles";
import styles from "./Main.module.css";

type TProps = {
    className: string,
}

export const Main = ({ className }: TProps) => {
    const { t } = useTranslation();

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={styles.instructions1}>
                {t("На данном камне, покрытом гвоздеобразными письменами, можно прочесть отрывок из произведения одного русского поэта, если одиночные гвоздеобразные знаки заменить гласными, а па́рные — согласными буквами. Входящие в состав отрывка 29 согласных и 26 гласных букв необходимо для этого взять из 12 слов, имеющих следующие значения:")}
            </div>
            <Riddles />
            <div className={styles.instructions2}>
                {t("Приняв во внимание, что одинаковые гласные буквы изображены на камне одним и тем же знаком, и что искомые слова расположены в алфавитном порядке их начальных букв, — прочесть требуемый отрывок.")}
            </div>
        </div>
    )
};
