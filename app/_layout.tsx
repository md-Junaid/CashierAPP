import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { UserProvider } from '@/components/UserContext';


// import { useColorScheme } from '@/hooks/useColorScheme';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {colorScheme,setColorScheme, isDarkColorScheme} = useColorScheme();
  // const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);r
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // useEffect(() => {
  //   (async () => {
  //     const theme = await AsyncStorage.getItem('theme');
  //     if (Platform.OS === 'web') {
  //       // Adds the background color to the html element to prevent white background on overscroll.
  //       document.documentElement.classList.add('bg-background');
  //     }
  //     if (!theme) {
  //       AsyncStorage.setItem('theme', colorScheme);
  //       setIsColorSchemeLoaded(true);
  //       return;
  //     }
  //     const colorTheme = theme === 'dark' ? 'dark' : 'light';
  //     if (colorTheme !== colorScheme) {
  //       setColorScheme(colorTheme);

  //       setIsColorSchemeLoaded(true);
  //       return;
  //     }
  //     setIsColorSchemeLoaded(true);
  //   })().finally(() => {
  //     SplashScreen.hideAsync();
  //   });
  // }, []);

  // if (!isColorSchemeLoaded) {
  //   return null;
  // }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    {/* <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}> */}
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}
