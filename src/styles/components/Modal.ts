import { ComponentStyleConfig } from '@chakra-ui/react'

const Modal: ComponentStyleConfig = {
	baseStyle: (props) => ({
		dialog: {
			width: '100%',
			borderRadius: props.size === 'full' ? 0 : '2xl',
		},
	}),
	variants: {
		stretched: {
			dialog: {
				width: '100%',
			},
		},
	},
}

export default Modal
