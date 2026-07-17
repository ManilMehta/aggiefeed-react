import { ActivityIndicator, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { getColors } from '../theme/colors';

type ScreenStateProps = {
  title: string;
  message?: string;
  isLoading?: boolean;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function ScreenState({
  title,
  message,
  isLoading = false,
  actionLabel,
  onActionPress,
}: ScreenStateProps) {
  const colors = getColors(useColorScheme());
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onActionPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onActionPress}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

type ThemeColors = ReturnType<typeof getColors>;

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  message: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '700',
  },
});
}
