import { ComponentStyleConfig } from '@chakra-ui/react'

const Menu: ComponentStyleConfig = {
	baseStyle: {
		list: {
			py: 0,
			border: 'none',
			boxShadow: 'lg',
		},
		item: {
			py: 2,
		},
		groupTitle: {
			pt: 4,
			pb: 2,
			my: 0,
		},
	},
}

export default Menu
