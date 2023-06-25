/** Language: modern or pre-revolutionary Russian */
export type TLanguage = "modern" | "old";

type TLetterInfo = { inRiddles: boolean, inStone: boolean };

export type TLetters = Record<string, TLetterInfo>;