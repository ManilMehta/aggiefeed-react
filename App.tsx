import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import type { RootStackParamList } from './src/navigation/types';
import { ActivityDetailScreen } from './src/screens/ActivityDetailScreen';
import { ActivityListScreen } from './src/screens/ActivityListScreen';
import { getColors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const baseNavigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      background: colors.background,
      border: colors.border,
      card: colors.primary,
      primary: colors.primary,
      text: colors.text,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.buttonText,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen
          component={ActivityListScreen}
          name="ActivityList"
          options={{ title: 'AggieFeed' }}
        />
        <Stack.Screen
          component={ActivityDetailScreen}
          name="ActivityDetail"
          options={{ title: 'Activity Details' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
