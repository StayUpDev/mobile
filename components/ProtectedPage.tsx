import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";

export default function ProtectedPage({ children }: any) {
  const { authState } = useAuth();
  const isAuth = authState?.authenticated === true;

  if (!isAuth) {
    router.push("/login");
  }

  return <>{children}</>;
}
