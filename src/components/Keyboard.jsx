import { useEffect } from 'react'
import { Backspace } from '../assets/svg/Backspace'
import { status2color } from '../assets/functions/satus2color'
import PropTypes from 'prop-types'

const keyboardKeys = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

export function Keyboard({ onLetterPress, onBsPress, onEnterPress, letterColor, tutorialModal }) {
	useEffect(() => {
		const keyboardHandler = (event) => {
			if (event.key === 'Enter') {
				onEnterPress()
				return
			}

			if (event.key === 'Backspace') {
				onBsPress()
				return
			}

			if (event.key.toLowerCase() >= 'a' && event.key.toLowerCase() <= 'z' && event.key.length === 1) {
				onLetterPress(event.key.toUpperCase())
				return
			}
		}
		window.addEventListener('keydown', keyboardHandler)

		return () => removeEventListener('keydown', keyboardHandler)
	}, [tutorialModal])

	return (
		<div className="keyboard">
			<div>
				{keyboardKeys[0].map((key) => (
					<button
						key={key}
						onClick={() => onLetterPress(key)}
						style={{ backgroundColor: status2color[letterColor[key]] }}
					>
						{key}
					</button>
				))}
			</div>

			<div>
				{keyboardKeys[1].map((key) => (
					<button
						key={key}
						onClick={() => onLetterPress(key)}
						style={{ backgroundColor: status2color[letterColor[key]] }}
					>
						{key}
					</button>
				))}
			</div>

			<div>
				<button
					style={{ fontSize: 16, width: 60 }}
					onClick={() => {
						onEnterPress()
					}}
				>
					ENTER
				</button>

				{keyboardKeys[2].map((key) => (
					<button
						key={key}
						onClick={() => onLetterPress(key)}
						style={{ backgroundColor: status2color[letterColor[key]] }}
					>
						{key}
					</button>
				))}

				<button
					style={{ padding: '0 20px', width: 60 }}
					onClick={() => onBsPress()}
				>
					<Backspace />
				</button>
			</div>
		</div>
	)
}

Keyboard.propTypes = {
	onLetterPress: PropTypes.func,
	onBsPress: PropTypes.func,
	onEnterPress: PropTypes.func,
	letterColor: PropTypes.object,
	tutorialModal: PropTypes.bool,
}
