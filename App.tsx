import { useEffect } from 'react';

import {
  NavigationContainer,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NAV_THEME } from '@/lib/constants';

import '@/global.css';
import { main } from '@/stores/main';
import { PortalHost } from '@rn-primitives/portal';
import { useColorScheme } from 'nativewind';
import { Toaster, toast } from 'sonner-native';

import TransferDialog from './components/TransferDialog';
import useAppState from './hooks/useAppState';
import Index from './screens/Calculator/View';
import Main from './screens/Main/View';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export default observer(() => {
  const Stack = createNativeStackNavigator();

  const { colorScheme } = useColorScheme();

  useAppState();

  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme != 'dark' ? 'dark' : 'light'} />

      <GestureHandlerRootView>
        <NavigationContainer>
          <ThemeProvider
            value={colorScheme == 'dark' ? DARK_THEME : LIGHT_THEME}
          >
            <Stack.Navigator initialRouteName="main">
              <Stack.Screen name="Menu" component={Main} />
              {main.calculators.map((calculator) => (
                <Stack.Screen
                  key={calculator.id}
                  name={calculator.id}
                  component={Index}
                  options={{
                    title: calculator.name,
                    headerRight: () => <TransferDialog id={calculator.id} />,
                  }}
                  initialParams={{
                    viewModel: calculator.model,
                  }}
                />
              ))}
            </Stack.Navigator>
          </ThemeProvider>
        </NavigationContainer>

        <Toaster position="bottom-center" />
        <OnToastLoad />
      </GestureHandlerRootView>

      <PortalHost />
    </SafeAreaProvider>
  );
});

function OnToastLoad() {
  useEffect(() => {
    toast('Velkommen!', { position: 'top-center', id: 'welcome' });
  }, []);

  return null;
}
