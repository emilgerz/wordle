import { lettersBackground } from '../assets/functions/lettersBackground'
import { status2color } from '../assets/functions/satus2color'
import PropTypes from 'prop-types'

export function ColoredWord({ word, hiddenWord }) {
	const lettersBg = lettersBackground(word, hiddenWord)

	return (
		<div className="wordle__table__word">
			{lettersBg.map(([letter, status], i) => (
				<div
					key={letter + status + i}
					className="wordle__table__word__letter wordle__table__word__letter-result"
					style={{
						backgroundColor: status2color[status],
						color: 'white',
						borderColor: '#a8a8a8',
					}}
				>
					<p>{letter}</p>
				</div>
			))}
		</div>
	)
}

ColoredWord.propTypes = {
	word: PropTypes.string,
	hiddenWord: PropTypes.string,
}
