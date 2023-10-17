import { useContext } from 'react'
import { ThemeContext } from '@/entities/theme'

export const useTheme = () => useContext(ThemeContext)
