export const colors = {
  primary: '#1e40af', // Dark blue
  primaryLight: '#3b82f6', // Lighter blue
  background: '#ffffff', // White
  surface: '#f8fafc', // Very light gray
  text: '#1e293b', // Dark gray
  textSecondary: '#64748b', // Medium gray
  textLight: '#94a3b8', // Light gray
  border: '#e2e8f0', // Light border
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

const tintColorLight = colors.primary;

export default {
  light: {
    text: colors.text,
    background: colors.background,
    tint: tintColorLight,
    tabIconDefault: colors.textLight,
    tabIconSelected: tintColorLight,
  },
};