export const getTheme = (isDark: boolean) => ({
    backgroundStart: isDark ? '#121212' : '#e0f2fe',
    backgroundEnd: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#1e293b',
    subtext: isDark ? 'rgba(203, 213, 225, 0.8)' : 'rgba(71, 85, 105, 0.8)',
    card: isDark ? '#1e293b' : 'rgba(255, 255, 255, 0.7)',
    border: isDark ? '#334155' : '#e2e8f0',
    primary: '#10b981',
    secondaryText: isDark ? '#a1a1aa' : '#64748b',
    correct: isDark ? '#0eca50' : '#bbf7d0',
    incorrect: isDark ? '#f63232': '#fecaca',
});