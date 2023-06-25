import i18next from "i18next";
import { makeAutoObservable, observable } from "mobx";
import { InputHandler } from "../classes/InputHandler";
import { Answers } from "../classes/Answers";
import { TLanguage, TLetters } from "../components/types";

/** Stone dimensions */
const COLUMNS_COUNT: number = 10;
const ROWS_COUNT: number = 6;

export class GameStore {
    /** Current language */
    language: TLanguage = "old";
    /** Suggestions to riddles */
    riddleSuggestions: string[] = Array(Answers.riddles.length).fill("");
    /** Suggestions to stone letters */
    stoneSuggestions: string[] = Array(Answers.stone.old.length).fill("");
    /** What number of letters got word at which index as a hint */
    riddleHints: Record<number, number> = {};
    /** What letter is focused on stone */
    focusedStoneLetter: string | null = null;
    /** What letter index is focused on stone */
    focusedStoneLetterIndex: number = -1;
    /** Open stone hints */
    openStoneHints: Record<number, boolean> = {};
    noMoreHints: boolean = false;
    /** Is game ended */
    victory: boolean = false;
    victoryModalOpen: boolean = false;

    constructor() {
        for (let i = 0; i < Answers.riddles.length; i++) {
            this.riddleHints[i] = 0;
        }

        const oldLength = Answers.stone.old.length;
        for (let i = 0; i < oldLength; i++) {
            this.openStoneHints[i] = false;
        }

        makeAutoObservable(this, {
            riddleSuggestions: observable,
            stoneSuggestions: observable,
            language: observable,
            riddleHints: observable,
            focusedStoneLetter: observable,
            focusedStoneLetterIndex: observable,
            victory: observable,
            victoryModalOpen: observable,
            openStoneHints: observable,
            noMoreHints: observable,
        });
    }

    setRiddleSuggestion(index: number, answer: string): void {
        if (this.riddleSuggestions[index] === undefined) {
            throw new Error("Wrong index provided for answer: " + index);
        }

        let newSuggestion = InputHandler.engToRus(answer)
            .replace(/[^а-яёѢ]/gi, "")
            .toUpperCase();

        const hint = this.getRiddleHint(index);

        const answerRegExp = Answers.riddleRegExps[index];
        const suggestionWithHint = (hint + newSuggestion).toUpperCase();

        this.riddleSuggestions[index] = answerRegExp.test(suggestionWithHint)
            ? suggestionWithHint
            : newSuggestion;

        this.checkVictory();
    }

    private setLanguage(language: TLanguage): void {
        this.language = language;
        i18next.changeLanguage(language);
    }

    toggleLanguage(): void {
        this.setLanguage(this.language === "modern" ? "old" : "modern");
    }

    getUsedLetter(): TLetters {
        const lettersAccumulator: TLetters = {};
        this.riddleSuggestions.forEach((answer, index) => {
            const letters = answer.split("");
            letters.forEach((letter) => {
                if (lettersAccumulator[letter] === undefined) {
                    lettersAccumulator[letter] = { inRiddles: true, inStone: false };
                }
            });

            const hint = this.getRiddleHint(index);
            const hintLetters = hint.split("");
            hintLetters.forEach((letter) => {
                if (lettersAccumulator[letter] === undefined) {
                    lettersAccumulator[letter] = { inRiddles: true, inStone: false };
                }
                lettersAccumulator[letter].inRiddles = true;
            });
        });
        this.stoneSuggestions.forEach((letter) => {
            if (letter !== "") {
                if (lettersAccumulator[letter] === undefined) {
                    lettersAccumulator[letter] = { inRiddles: false, inStone: true };
                } else {
                    lettersAccumulator[letter].inStone = true;
                }
            }
        });

        return lettersAccumulator;
    }

    getSuggestion(index: number): string {
        if (this.riddleSuggestions[index] === undefined) {
            throw new Error("No word found for index " + index);
        }
        return this.riddleSuggestions[index];
    }

    isRiddleSuggestionCorrect(index: number): boolean {
        const answerRegex = Answers.riddleRegExps[index];
        if (answerRegex === undefined) {
            throw new Error("Answer not found");
        }
        const suggestion = this.riddleSuggestions[index];
        const suggestionWithHint = this.getRiddleSuggestionWithHint(index);

        return answerRegex.test(suggestion) || answerRegex.test(suggestionWithHint);
    }

    getRiddleSuggestionWithHint(index: number): string {
        const hint = this.getRiddleHint(index);
        const suggestion = this.riddleSuggestions[index];
        return hint + suggestion.replace(new RegExp(`^${hint}`, "i"), "");
    }

    /** Checks if answers to riddle follow in alphabetic order */
    suggestionsOrderedAlphabetically(): boolean {
        let lastSuggestion: string | null = null;
        for (let i = 0; i < this.riddleSuggestions.length; i++) {
            const suggestion = this.getRiddleSuggestionWithHint(i);

            if (suggestion === "") {
                continue;
            }
            if (lastSuggestion === null) {
                lastSuggestion = suggestion;
                continue;
            }
            if (suggestion < lastSuggestion) {
                return false;
            }
            lastSuggestion = suggestion;
        }
        return true;
    }

    addRiddleHint(index: number, inputRef: HTMLInputElement | null): void {
        const nextOpen = this.riddleHints[index] + 1;
        const answer = Answers.riddles[index];
        if (nextOpen === answer.length) {
            this.setRiddleSuggestion(index, answer);
        } else {
            if (inputRef !== null) {
                inputRef.focus();
            }
        }
        this.riddleHints[index]++;

        if (this.getRiddleSuggestionWithHint(index).toUpperCase() === answer.toUpperCase()) {
            this.setRiddleSuggestion(index, answer);
        }
    }

    getRiddleHint(index: number): string {
        return Answers.riddles[index].substring(0, this.riddleHints[index]).toUpperCase();
    }

    getStoneAnswer(): (string | null)[]
    {
        return Answers.stone[this.language];
    }

    getStoneSuggestion(index: number): string
    {
        if (this.stoneSuggestions[index] === undefined) {
            throw new Error("Wrong index provided for stone letter: " + index);
        }
        return this.stoneSuggestions[index];
    }

    setStoneSuggestion(index: number, value: string): void
    {
        const currentLetters = Answers.stone[this.language];
        const initialLetter = currentLetters[index];
        let foundEmpty = false;
        this.stoneSuggestions[index] = value;
        currentLetters.forEach((letter, loopIndex) => {
            if (letter === null) {
                return;
            }
            // Setting the nearest empty letter index as focused
            if (!foundEmpty && value !== "" && loopIndex > index && this.stoneSuggestions[loopIndex] === "") {
                this.setFocusedStoneLetterIndex(loopIndex);
                foundEmpty = true;
            }
            if (letter === initialLetter) {
                this.stoneSuggestions[loopIndex] = value;
            }
        });

        this.checkVictory();
    }

    unblurStone(): void
    {
        this.focusedStoneLetter = null;
        this.focusedStoneLetterIndex = -1;
    }

    getFocusedStoneLetter(): string | null
    {
        return this.focusedStoneLetter;
    }

    getFocusedStoneLetterIndex(): number
    {
        return this.focusedStoneLetterIndex;
    }

    getFocusedStoneLetterIndexWithoutNulls(): number
    {
        const index = this.focusedStoneLetterIndex;
        if (this.language === "old") {
            return index;
        }
        let counter = -1;
        const letters = Answers.stoneForLanguage(this.language);
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            if (letter === null) {
                continue;
            }
            counter++;
            if (i === index) {
                break;
            }
        }
        return counter;
    }

    setFocusedStoneLetterIndex(index: number): void
    {
        this.focusedStoneLetter = Answers.stone[this.language][index];
        this.focusedStoneLetterIndex = index;
    }

    getStoneWithoutEmpty(): string[]
    {
        return this.stoneSuggestions.filter((letter) => letter !== "");
    }

    /** Move focus cursor through stone letters */
    moveFocus(key: "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft"): void
    {
        const currentLanguageLettersCount = Answers.stoneForLanguage(this.language).filter((letter) => letter !== null).length;
        // const currentFocusId = this.getFocusedStoneLetterIndex();
        const currentFocusId = this.getFocusedStoneLetterIndexWithoutNulls();
        const currentRow = Math.floor(currentFocusId / COLUMNS_COUNT);
        const currentColumn = currentFocusId % COLUMNS_COUNT;
        const lastRowCount = currentLanguageLettersCount % COLUMNS_COUNT;
        const currentRowIsLast = currentRow === ROWS_COUNT - 1;

        let newRow = currentRow;
        let newColumn = currentColumn;
        if (key === "ArrowUp") {
            newRow = newRow - 1;
            if (newRow < 0) {
                if (newColumn >= lastRowCount) {
                    newRow = ROWS_COUNT - 2;
                } else {
                    newRow = ROWS_COUNT - 1;
                }
            }
        } else if (key === "ArrowDown") {
            newRow = newRow + 1;
            if (newColumn >= lastRowCount && newRow >= ROWS_COUNT - 1) {
                newRow = 0;
            } else {
                if (newRow >= ROWS_COUNT) {
                    newRow = 0;
                }
            }
        } else if (key === "ArrowLeft") {
            newColumn = newColumn - 1;
            if (newColumn < 0) {
                if (currentRowIsLast) {
                    newColumn = lastRowCount - 1;
                } else {
                    newColumn = COLUMNS_COUNT - 1;
                }
            }
        } else if (key === "ArrowRight") {
            newColumn = currentColumn + 1;
            if (currentRowIsLast) {
                if (newColumn >= lastRowCount) {
                    newColumn = 0;
                }
            } else {
                if (newColumn >= COLUMNS_COUNT) {
                    newColumn = 0;
                }
            }
        }

        const focusIndexWithoutNulls = newRow * COLUMNS_COUNT + newColumn;
        if (this.language === "old") {
            this.setFocusedStoneLetterIndex(focusIndexWithoutNulls);
            return;
        }

        let focusIndexWithNulls = -1;
        let nullsFound = 0;
        const modern = Answers.stoneForLanguage("modern");
        for (let i = 0; i < modern.length; i++) {
            const letter = modern[i];
            if (letter === null) {
                nullsFound++;
            }
            if (i - nullsFound === focusIndexWithoutNulls) {
                focusIndexWithNulls = focusIndexWithoutNulls + nullsFound;
                break;
            }
        }
        this.setFocusedStoneLetterIndex(focusIndexWithNulls);
    }

    getIndexWithoutNulls(index: number): number
    {
        let realIndex = 0;
        const letters = this.getStoneWithoutEmpty();
        for (let i = 0; i < letters.length; i++) {
            if (i > index) {
                break;
            }
            const letter = letters[i];
            if (letter === null) {
                continue;
            }
            realIndex++;
        }

        return realIndex;
    }

    checkVictory(): void
    {
        if (this.victory) {
            return;
        }

        const riddlesAreCorrect = this.riddleSuggestions.every((suggestion, index) => {
            return Answers.riddleRegExps[index].test(suggestion);
        });

        if (!riddlesAreCorrect) {
            return;
        }

        if (Answers.stoneRegExps[this.language].test(this.getStoneWithoutEmpty().join(""))) {
            this.victory = true;
            this.victoryModalOpen = true;
        }
    }

    openStoneHint(): void
    {
        const stone = Answers.stone[this.language];
        const nextHintToOpen = stone.findIndex((letter, index) => !this.openStoneHints[index]);
        if (nextHintToOpen === -1) {
            this.noMoreHints = true;
            return;
        }
        let nextLetter = stone[nextHintToOpen];
        if (nextLetter !== null) {
            nextLetter = nextLetter.toUpperCase();
            for (let i = 0; i < stone.length; i++) {
                if (stone[i]?.toUpperCase() === nextLetter) {
                    this.stoneSuggestions[i] = nextLetter;
                    this.openStoneHints[i] = true;
                }
            }
        }
    }
}