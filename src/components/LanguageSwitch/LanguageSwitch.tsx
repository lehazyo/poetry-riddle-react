import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { gameStore } from "../App/App";

export const LanguageSwitch = () => {
    const { t } = useTranslation();

    return (
        <Button onClick={() => { gameStore.toggleLanguage() }}>
            {t("Включить дореволюціонный русскій")}
        </Button>
    );
};
