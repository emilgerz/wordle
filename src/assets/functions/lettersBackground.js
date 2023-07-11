export const lettersBackground = (word, hiddenWord) => {
	return Array.from(word, (letter, i) => {
		if (letter === hiddenWord[i]) {
			return [letter, 'correct']
		}

		if (hiddenWord.includes(letter)) {
			return [letter, 'includes']
		}

		return [letter, 'fail']
	})
}
