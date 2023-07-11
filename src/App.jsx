import { useEffect, useReducer } from 'react'
import { newKeyboardStyles } from './assets/functions/newKeyboardStyles'
import { Keyboard } from './components/Keyboard'
import { Table } from './components/Table'
import { wordsBank } from './assets/wordsBank'
import { createPortal } from 'react-dom'
import { TutorialModal } from './components/TutorialModal'
import 'modern-css-reset'
import './App.scss'
import logo from './assets/img/logo.png'

const initialState = {
	hiddenWord: '',
	enteredWords: [],
	inputWord: '',
	tutorialModal: false,
	isCorrectWord: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ENTER_PRESS': {
			const { inputWord } = state

			if (inputWord.length !== 5) {
				return state
			}

			if (!wordsBank.includes(inputWord.toLowerCase())) {
				return { ...state, isCorrectWord: true }
			}

			return {
				...state,
				inputWord: '',
				enteredWords: [...state.enteredWords, inputWord],
				isCorrectWord: false,
			}
		}

		case 'LETTER_PRESS': {
			const { inputWord, enteredWords, hiddenWord } = state

			if (enteredWords.includes(hiddenWord)) {
				return state
			}

			return {
				...state,
				inputWord: inputWord.length < 5 ? inputWord + action.letter : inputWord,
				isCorrectWord: false,
			}
		}

		case 'BS_PRESS': {
			return { ...state, inputWord: state.inputWord.slice(0, -1) }
		}

		case 'SET_RANDOM_WORD': {
			return { ...state, hiddenWord: wordsBank.at(action.value).toUpperCase() }
		}

		case 'READ_TUTORIAL': {
			return { ...state, tutorialModal: !state.tutorialModal }
		}

		case 'RESET_STATE': {
			return initialState
		}

		default: {
			return state
		}
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { hiddenWord, enteredWords, inputWord, tutorialModal, isCorrectWord } = state

	const win = enteredWords.includes(hiddenWord)
	const failed = !win && enteredWords.length === 6

	// Uncomment below to see hints
	// console.log(state)

	const onLetterPress = (key) => {
		dispatch({ type: 'LETTER_PRESS', letter: key })
	}

	const onBsPress = () => {
		dispatch({ type: 'BS_PRESS' })
	}

	const onEnterPress = () => {
		dispatch({ type: 'ENTER_PRESS' })
	}

	const newWordHandler = () => {
		const randomIndex = Math.floor(Math.random() * wordsBank.length + 1)

		dispatch({ type: 'RESET_STATE' })
		dispatch({ type: 'SET_RANDOM_WORD', value: randomIndex })
	}

	useEffect(() => {
		newWordHandler()
	}, [])

	const letterColor = newKeyboardStyles(enteredWords, hiddenWord)

	const tutorialHandler = () => {
		dispatch({ type: 'READ_TUTORIAL' })
	}

	return (
		<>
			<div className="heading">
				<div>
					<img
						className="logo"
						src={logo}
						alt="Wordle Logo"
					/>
					<h3>
						by{' '}
						<a
							href="https://github.com/emilgerz"
							target="_blank"
							rel="noreferrer"
						>
							@emilgerz
						</a>
					</h3>
				</div>

				<button
					className="wordle__button"
					onClick={tutorialHandler}
				>
					?
				</button>
			</div>

			<div className="wordle">
				{failed && <p className="wordle__result">{hiddenWord}</p>}
				{win && <p className="wordle__result">🎉 WIN 🎉</p>}
				{isCorrectWord && <p className="wordle__result">❌ INCORRECT WORD ❌</p>}

				<Table
					enteredWords={enteredWords}
					inputWord={inputWord}
					hiddenWord={hiddenWord}
					isCorrectWord={isCorrectWord}
				/>

				<Keyboard
					onLetterPress={onLetterPress}
					onEnterPress={onEnterPress}
					onBsPress={onBsPress}
					letterColor={letterColor}
					tutorialModal={tutorialModal}
				/>

				{(failed || win) && (
					<button
						className="wordle__button-restart"
						onClick={newWordHandler}
					>
						RECIEVE NEW WORD
					</button>
				)}

				{tutorialModal && createPortal(<TutorialModal tutorialHandler={tutorialHandler} />, document.body)}
			</div>
		</>
	)
}

export default App
