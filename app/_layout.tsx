import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { router } from "expo-router";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode="light">
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Layout />
          </ThemeProvider>
        </GluestackUIProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

const Layout = () => {
  const { authState } = useAuth();
  const isAuth = authState?.authenticated === true;

  useEffect(() => {
    if (!isAuth) {
      // Redirect to login if the user is not authenticated
      router.replace("/login");
    }
  }, [isAuth]);

  // Always render a Slot or Stack on first render
  return <Slot />;
};
