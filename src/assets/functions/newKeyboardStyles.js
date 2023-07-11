import { lettersBackground } from './lettersBackground'

export function newKeyboardStyles(arrayOfWords, hiddenWord) {
	const styleEntries = arrayOfWords.flatMap((word) => lettersBackground(word, hiddenWord))
	const styleEntriesCorrect = styleEntries.filter((pair) => pair[1] === 'correct')

	return { ...Object.fromEntries(styleEntries), ...Object.fromEntries(styleEntriesCorrect) }
}
