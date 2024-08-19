import { ComponentStyleConfig } from '@chakra-ui/react'

const Accordion: ComponentStyleConfig = {
	baseStyle: {},
	variants: {
		round: {
			width: 5,
			height: 5,
			fontSize: 'xs',
			borderRadius: 'full',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	},
}

export default Accordion
