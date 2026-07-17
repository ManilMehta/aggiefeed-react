import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { getColors } from '../theme/colors';
import type { Activity } from '../types/activity';

type ActivityListItemProps = {
  activity: Activity;
  onPress: () => void;
};

export function getActivityTitle(activity: Activity): string {
  return activity.title?.trim() || 'Untitled activity';
}

export function getActorName(activity: Activity): string {
  return activity.actor?.displayName?.trim() || 'Unknown actor';
}

export function ActivityListItem({ activity, onPress }: ActivityListItemProps) {
  const colors = getColors(useColorScheme());
  const styles = createStyles(colors);
  const title = getActivityTitle(activity);
  const actorName = getActorName(activity);

  return (
    <Pressable
      accessibilityLabel={`Open details for ${title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.actor}>
          {actorName}
        </Text>
      </View>
    </Pressable>
  );
}

type ThemeColors = ReturnType<typeof getColors>;

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
  },
  actor: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 8,
  },
});
}
