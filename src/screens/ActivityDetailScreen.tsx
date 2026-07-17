import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getActorName, getActivityTitle } from '../components/ActivityListItem';
import type { RootStackParamList } from '../navigation/types';
import { getColors } from '../theme/colors';
import { formatPublishedDate } from '../utils/formatDate';

type ActivityDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ActivityDetail'
>;

export function ActivityDetailScreen({ route }: ActivityDetailScreenProps) {
  const colors = getColors(useColorScheme());
  const styles = createStyles(colors);
  const { activity } = route.params;
  const objectType = activity.object?.objectType?.trim() || 'Unknown type';

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Activity</Text>
          <Text style={styles.title}>{getActivityTitle(activity)}</Text>

          <DetailRow label="Actor" styles={styles} value={getActorName(activity)} />
          <DetailRow label="Object type" styles={styles} value={objectType} />
          <DetailRow
            label="Published"
            styles={styles}
            value={formatPublishedDate(activity.published)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type DetailRowProps = {
  label: string;
  styles: ReturnType<typeof createStyles>;
  value: string;
};

function DetailRow({ label, styles, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

type ThemeColors = ReturnType<typeof getColors>;

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 31,
    marginTop: 8,
  },
  detailRow: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: 18,
    paddingTop: 18,
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
  },
});
}
