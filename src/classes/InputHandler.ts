export const consonant = "c";
export const vowel = "v";

export type TLetterType = "c" | "v";

export class InputHandler {
    private static readonly englishToRussian: Record<string, string> = {
        "q": "й",
        "w": "ц",
        "e": "у",
        "r": "к",
        "t": "е",
        "y": "н",
        "u": "г",
        "i": "ш",
        "o": "щ",
        "p": "з",
        "[": "х",
        "]": "ъ",
        "a": "ф",
        "s": "ы",
        "d": "в",
        "f": "а",
        "g": "п",
        "h": "р",
        "j": "о",
        "k": "л",
        "l": "д",
        ";": "ж",
        "'": "э",
        "z": "я",
        "x": "ч",
        "c": "с",
        "v": "м",
        "b": "и",
        "n": "т",
        "m": "ь",
        ",": "б",
        ".": "ю",
        "/": "ѣ",
        "\\": "ѣ"
    };

    private static readonly lettersByTypes: Record<string, string> = {
        "а": vowel,
        "б": consonant,
        "в": consonant,
        "г": consonant,
        "д": consonant,
        "е": vowel,
        "ё": vowel,
        "ж": consonant,
        "з": consonant,
        "и": vowel,
        "й": consonant,
        "к": consonant,
        "л": consonant,
        "м": consonant,
        "н": consonant,
        "о": vowel,
        "п": consonant,
        "р": consonant,
        "с": consonant,
        "т": consonant,
        "у": vowel,
        "ф": consonant,
        "х": consonant,
        "ц": consonant,
        "ч": consonant,
        "ш": consonant,
        "щ": consonant,
        "ъ": vowel,
        "ы": vowel,
        "ь": vowel,
        "ѣ": vowel,
        "э": vowel,
        "ю": vowel,
        "я": vowel,
    }

    static engToRus(rawText: string): string {
        const lettersArray: string[] = rawText.toLowerCase().split("");
        let refinedText: string = "";
        for (const letter of lettersArray) {
            if (this.englishToRussian[letter] !== undefined) {
                refinedText += this.englishToRussian[letter];
            } else {
                refinedText += letter;
            }
        }
        return refinedText;
    }

    static isConsonant(value: string): boolean {
        const refinedValue = value.toLowerCase();
        if (this.lettersByTypes[refinedValue] !== undefined) {
            return this.lettersByTypes[refinedValue] === consonant;
        }
        return false;
    }
}