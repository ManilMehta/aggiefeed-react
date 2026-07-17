import type { ColorSchemeName } from 'react-native';

const lightColors = {
  accent: '#b26b00',
  background: '#f7f7f5',
  border: '#e5e7eb',
  buttonText: '#ffffff',
  card: '#ffffff',
  mutedText: '#4b5563',
  primary: '#022851',
  shadow: '#000000',
  text: '#111827',
};

const darkColors = {
  accent: '#ffbf59',
  background: '#111827',
  border: '#374151',
  buttonText: '#ffffff',
  card: '#1f2937',
  mutedText: '#d1d5db',
  primary: '#022851',
  shadow: '#000000',
  text: '#f9fafb',
};

export function getColors(colorScheme: ColorSchemeName) {
  return colorScheme === 'dark' ? darkColors : lightColors;
}
