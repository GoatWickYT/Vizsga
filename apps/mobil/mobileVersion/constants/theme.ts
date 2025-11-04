import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2F2B25',          // primary-text: deep earthy brown
    background: '#F3F0E6',    // primary-bg: warm parchment
    tint: '#E9B44C',          // highlight-bg: golden sunlight
    icon: '#8B7355',          // primary-detail: wood tone
    tabIconDefault: '#9AAD91',// secondary-detail: moss green
    tabIconSelected: '#E9B44C',
    secondaryText: '#3D4B35', // forest green
    secondaryBackground: '#E6EAE3',
  },
  dark: {
    text: '#ECEDEE',          // light text
    background: '#1C1B19',    // dark earthy base
    tint: '#C79200',          // golden accent for dark mode
    icon: '#AFA893',          // warm neutral
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#E9B44C',
    secondaryText: '#B6C2B0',
    secondaryBackground: '#242622',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
