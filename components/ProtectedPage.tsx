import { useAuth } from "@/app/context/AuthContext";
import { Redirect, router } from "expo-router";

export default function ProtectedPage({ children }: any) {
  const { authState } = useAuth();
  const isAuth = authState?.authenticated === true;

  return !isAuth ? <Redirect href={"/pages/register"} /> : <>{children}</>;
}
