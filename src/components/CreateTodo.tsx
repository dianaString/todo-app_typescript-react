import { useState } from 'react'
import { type TodoTitle } from '../types'

interface Props {
	saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
	const [inputValue, setInputValue] = useState('')

	const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
		e.preventDefault()
		saveTodo({ title: inputValue })
		setInputValue('')
	}

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				className='new-todo'
				value={inputValue}
				onChange={handleOnChange}
				placeholder='¿Qué quieres hacer?'
				autoFocus
			/>
		</form>
	)
}
