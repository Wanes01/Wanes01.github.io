let isDark = $state<boolean>(false);

export const toggleDarkMode = () => {
    isDark = !isDark;
}

export default function isDarkMode() {
    return isDark;
} 