import { type TodoId, type Todo as TodoType } from '../types'
import { motion } from 'framer-motion'

interface Props extends TodoType {
	onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
	onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({
	id,
	title,
	completed,
	onRemoveTodo,
	onToggleCompleteTodo,
}) => {
	const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
		onToggleCompleteTodo({
			id,
			completed: event.target.checked,
		})
	}
	return (
		<div className='view'>
			<input
				className='toggle'
				checked={completed}
				type='checkbox'
				onChange={handleChangeCheckbox}
			/>
			<label>{title}</label>
			<motion.button
				whileTap={{ scale: 0.5 }}
				whileHover={{ cursor: 'pointer', scale: 1.25, transition: { duration: 0.1 } }}
				type='button'
				className='destroy'
				onClick={() => {
					onRemoveTodo({ id, completed })
				}}
			/>
		</div>
	)
}
