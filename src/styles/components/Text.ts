import { ComponentStyleConfig } from '@chakra-ui/react'

const Text: ComponentStyleConfig = {
	variants: {
		breakLines: {
			whiteSpace: 'pre-line',
			hyphens: 'auto',
			wordBreak: 'break-word',
		},
	},
}

export default Text
