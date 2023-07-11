import PropTypes from 'prop-types'

const classNames = (...classes) => classes.filter(Boolean).join(' ')

export function Word({ inputWord, isCorrectWord }) {
	const regularStyle = 'wordle__table__word__letter'
	const animatedStyle = `${regularStyle} wordle__table__word__letter-jump`

	return (
		<div className={classNames('wordle__table__word', isCorrectWord && 'wordle__table__word-wrong')}>
			{Array(5)
				.fill()
				.map((_, i) => (
					<div
						key={i}
						className={inputWord[i] ? animatedStyle : regularStyle}
						style={{ borderColor: inputWord[i] ? '#a8a8a8' : false }}
					>
						<p>{inputWord[i]}</p>
					</div>
				))}
		</div>
	)
}

Word.propTypes = {
	inputWord: PropTypes.string,
	isCorrectWord: PropTypes.bool,
}
