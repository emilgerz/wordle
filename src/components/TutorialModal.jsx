import tutorialPic from '../assets/img/tutorial-pic.png'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export const TutorialModal = ({ tutorialHandler }) => {
	useEffect(() => {
		const handler = (event) => {
			event.stopPropagation()
			console.log('stopPropagation()')
		}

		document.addEventListener('keydown', handler)

		return () => {
			document.removeEventListener('keydown', handler)
		}
	}, [])

	return (
		<div className="overflow">
			<div className="tutorial">
				<div className="tutorial__button">
					<button onClick={tutorialHandler}>⛌</button>
				</div>

				<div className="tutorial__content">
					<div>
						<h2>Guess the Wordle in 6 tries.</h2>
						<ul>
							<li>Each guess must be a valid 5-letter word.</li>
							<li>The color of the tiles will change to show how close your guess was to the word.</li>
						</ul>
					</div>

					<h3>Example:</h3>

					<img
						className="tutorial__content__pic"
						src={tutorialPic}
						alt="Tutorial Picture"
					/>

					<div>
						<p>
							Letters <span>S</span> and <span>N</span> are in the word, but in the wrong spot.
						</p>
						<p>
							Letter <span>K</span> is in the word and in the correct spot.
						</p>
						<p>
							Letters <span>A</span> and <span>E</span> are not in the word.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

TutorialModal.propTypes = {
	tutorialHandler: PropTypes.bool,
}
