import ProtectedPage from "@/components/ProtectedPage";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ProtectedPage>
      <Slot />
    </ProtectedPage>
  );
}
