// defaults to dark mode
export const theme = $state({ dark: true });

export const toggleDarkMode = () => {
    theme.dark = !theme.dark;
}