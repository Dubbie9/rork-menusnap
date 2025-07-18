import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuUploadProvider } from "@/providers/MenuUploadProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="restaurants" />
      <Stack.Screen name="camera" />
      <Stack.Screen name="upload" />
      <Stack.Screen name="success" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MenuUploadProvider>
          <RootLayoutNav />
        </MenuUploadProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}