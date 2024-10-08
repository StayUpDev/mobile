import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Redirect, router, useRootNavigationState } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { UserRole } from "./types";

export default function Page() {
  const { authState } = useAuth();

  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return authState?.authenticated === false ? (
    <Redirect href={"/pages/login"} />
  ) : authState?.userRole === "promoter" ? (
    <Redirect href={"/pages/protected/promoter/home"} />
  ) : (
    <Redirect href={"/pages/protected/participant/home"} />
  );
}
