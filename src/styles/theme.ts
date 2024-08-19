import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import Accordion from './components/Accordion'
import Badge from './components/Badge'
import Button from './components/Button'
import FormControl from './components/FormControl'
import Menu from './components/Menu'
import Modal from './components/Modal'
import NavLink from './components/NavLink'
import Tabs from './components/Tabs'
import Text from './components/Text'

const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Montserrat, sans-serif',
}

export const theme = extendTheme({
  colors,
  fonts,
  components: {
    Button,
    FormControl,
    Accordion,
    Badge,
    Tabs,
    Menu,
    Modal,
    Text,
    NavLink,
  },
})
