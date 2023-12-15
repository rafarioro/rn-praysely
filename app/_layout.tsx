import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { darkTheme, lightTheme } from '../styles/theme';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Redirect } from 'expo-router';
import store from '../redux/store'; 

import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
export { ErrorBoundary} from 'expo-router'; // Catch any errors thrown by the Layout component.
export const unstable_settings = { initialRouteName: '(tabs)', };// Ensure that reloading on `/modal` keeps a back button present.
SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before asset loading is complete.
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) { SplashScreen.hideAsync(); } }, [loaded]);

  if (!loaded) { return null; }

  return (
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutNav />
      </PersistGate> 
    </Provider>
  );
}

function RootLayoutNav() { 
 
  const { colorScheme, userData } = useSelector((state: any) => state.users);

  return (
    <Provider store={store}> 
        <ThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="section/Login" options={{ headerShown: false }} />
            <Stack.Screen name="section/Home" options={{ headerShown: false }} />

          </Stack>
        </ThemeProvider>
    </Provider>
  );
}


{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
{/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
