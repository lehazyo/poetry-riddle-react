import {TLanguage} from "../components/types";

export class Answers {
    static readonly stone: Record<string, (string | null)[]> = {
        old:    [ "п", "о", "в", "ѣ", "р", "ь", "с", "т", "р", "а", "д", "а", "н", "ь", "е", "н", "у", "ж", "н", "о", "н", "а", "м", "ъ",  "н", "е", "и", "с", "п", "ы", "т", "а", "в", "ъ",  "е", "г", "о", "н", "е", "л", "ь", "з", "я", "п", "о", "н", "я", "т", "ь", "и", "с", "ч", "а", "с", "т", "ь", "я" ],
        modern: [ "п", "о", "в", "е", "р", "ь", "с", "т", "р", "а", "д", "а", "н", "ь", "е", "н", "у", "ж", "н", "о", "н", "а", "м", null, "н", "е", "и", "с", "п", "ы", "т", "а", "в", null, "е", "г", "о", "н", "е", "л", "ь", "з", "я", "п", "о", "н", "я", "т", "ь", "и", "с", "ч", "а", "с", "т", "ь", "я" ],
    };

    static readonly stoneRegExps: Record<string, RegExp> = {
        old: /^пов[еѣ]рьстрадань[еѣ]нужнонамън[еѣ]испытавъ[еѣ]гон[еѣ]льзяпонятьисчастья$/i,
        modern: /^пов[еѣ]рьстрадань[еѣ]нужнонамн[еѣ]испытав[еѣ]гон[еѣ]льзяпонятьисчастья$/i,
    };

    static readonly riddles: string[] = [
        "весовая",
        "гать",
        "до",
        "жане",
        "липа",
        "осень",
        "папирус",
        "рысь",
        "степь",
        "узел",
        "ярило",
        "ячмень",
    ];

    static readonly riddleRegExps: RegExp[] = [
        /^в[еѣ]совая$/i,
        /^гать$/i,
        /^до$/i,
        /^жан[еѣ]$/i,
        /^липа$/i,
        /^осень$/i,
        /^папирус(ъ)?$/i,
        /^рысь$/i,
        /^степь$/i,
        /^узел(ъ)?$/i,
        /^ярило$/i,
        /^ячмень$/i,
    ];

    static stoneForLanguage(language: TLanguage): (string | null)[]
    {
        return this.stone[language];
    }
}