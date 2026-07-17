import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchActivities } from '../api/aggieFeed';
import { ActivityListItem } from '../components/ActivityListItem';
import { ScreenState } from '../components/ScreenState';
import type { RootStackParamList } from '../navigation/types';
import { getColors } from '../theme/colors';
import type { Activity } from '../types/activity';

type ActivityListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ActivityList'
>;

export function ActivityListScreen({ navigation }: ActivityListScreenProps) {
  const colors = getColors(useColorScheme());
  const styles = createStyles(colors);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadActivities = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setErrorMessage(null);

    try {
      const nextActivities = await fetchActivities();
      setActivities(nextActivities);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while loading AggieFeed.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadActivities();
  }, [loadActivities]);

  if (isLoading) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScreenState isLoading title="Loading AggieFeed" message="Fetching the latest public activities." />
      </SafeAreaView>
    );
  }

  if (errorMessage) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScreenState
          actionLabel="Try again"
          message={errorMessage}
          onActionPress={() => void loadActivities()}
          title="Unable to load activities"
        />
      </SafeAreaView>
    );
  }

  if (activities.length === 0) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScreenState
          actionLabel="Refresh"
          message="AggieFeed did not return any public activities."
          onActionPress={() => void loadActivities()}
          title="No activities found"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={activities}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(activity, index) => activity.id ?? activity._id ?? `activity-${index}`}
        refreshControl={
          <RefreshControl
            onRefresh={() => void loadActivities(true)}
            refreshing={isRefreshing}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <ActivityListItem
            activity={item}
            onPress={() => navigation.navigate('ActivityDetail', { activity: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

type ThemeColors = ReturnType<typeof getColors>;

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  listContent: {
    paddingVertical: 10,
  },
  separator: {
    height: 2,
  },
});
}
