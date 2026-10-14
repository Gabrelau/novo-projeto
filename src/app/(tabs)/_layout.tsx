import { Tabs } from 'expo-router';
import {
  CalendarDotsIcon,
  GearSixIcon,
  PawPrintIcon,
  SunIcon,
  WalletIcon,
  type Icon,
} from '@/components/icons';
import { View } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const tabs: { name: string; title: string; icon: Icon }[] = [
  { name: 'index', title: 'Hoje', icon: SunIcon },
  { name: 'agenda', title: 'Agenda', icon: CalendarDotsIcon },
  { name: 'clientes', title: 'Clientes', icon: PawPrintIcon },
  { name: 'financeiro', title: 'Financeiro', icon: WalletIcon },
  { name: 'ajustes', title: 'Ajustes', icon: GearSixIcon },
];

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          height: 68,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontFamily: Fonts.bold, fontSize: 11 },
      }}>
      {tabs.map(({ name, title, icon: TabIcon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <View className={`h-8 w-12 items-center justify-center rounded-full ${focused ? 'bg-accent' : ''}`}>
                <TabIcon size={22} color={color as string} weight={focused ? 'fill' : 'regular'} />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
