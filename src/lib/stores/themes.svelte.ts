// defaults to dark mode
export const theme = $state({ dark: false });

export const toggleDarkMode = () => {
    theme.dark = !theme.dark;
}