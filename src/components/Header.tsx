import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'
import { motion } from 'framer-motion'

interface Props {
	onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
	return (
		<header className='header'>
			<motion.h1
				initial={{ opacity: 0, scale: 0.85 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.5,
					ease: 'easeOut',
					type: 'spring',
				}}
			>
				Lista de tareas
			</motion.h1>
			<CreateTodo saveTodo={onAddTodo} />
		</header>
	)
}
