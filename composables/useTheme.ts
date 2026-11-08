export type ThemeMode = 'dark' | 'light'
export type AccentName = 'violet' | 'ocean' | 'ember' | 'forest'

export const ACCENTS: AccentName[] = ['violet', 'ocean', 'ember', 'forest']

export const useTheme = () => {
  const mode = useCookie<ThemeMode>('sh_mode', {
    default: () => 'dark',
    maxAge: 60 * 60 * 24 * 365
  })
  const accent = useCookie<AccentName>('sh_accent', {
    default: () => 'violet',
    maxAge: 60 * 60 * 24 * 365
  })

  const toggleMode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  const setAccent = (name: AccentName) => {
    accent.value = name
  }

  return { mode, accent, toggleMode, setAccent }
}