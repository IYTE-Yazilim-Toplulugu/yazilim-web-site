"use client"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div>
            {theme === 'dark'
                ? <Moon onClick={() => setTheme('light')} />
                : <Sun onClick={() => setTheme('dark')} />
            }
        </div>
    )
}

export default ThemeChanger
