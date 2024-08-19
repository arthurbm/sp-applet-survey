import { ComponentStyleConfig } from '@chakra-ui/react'

const Tabs: ComponentStyleConfig = {
	variants: {
		st: {
			tab: {
				fontWeight: 'bold',
				borderRadius: 'md',
				color: 'gray.300',
				_selected: {
					color: 'blue.500',
					backgroundColor: 'blue.50',
				},
				_hover: {
					bg: 'gray.200',
					color: 'gray.300',
				},
			},
		},
		followModal: {
			tab: {
				fontWeight: 'bold',
				color: 'gray.300',
				_selected: {
					color: 'gray.500',
					borderBottom: '1px',
					borderBottomColor: 'pink.500',
				},
				_focus: { shadow: 'none' },
			},

		},
	},
}

export default Tabs
