import { useAuth } from "./context/AuthContext";
import { Redirect, useRootNavigationState } from "expo-router";

export default function Page() {
  const { authState } = useAuth();

  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  console.log("index tsx has been rendered");

  return authState?.authenticated === false ? (
    <Redirect href={"/pages/login"} />
  ) : authState?.userRole === "promoter" ? (
    <Redirect href={"/pages/protected/promoter/home"} />
  ) : (
    <Redirect href={"/pages/protected/participant/home"} />
  );
}
