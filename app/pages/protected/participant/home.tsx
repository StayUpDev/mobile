import { useAuth } from "@/app/context/AuthContext";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Redirect } from "expo-router";

export default function Page() {
  console.log("Participant home was loaded");
  const { onLogout, authState } = useAuth();
  if (authState?.authenticated === false) {
    return <Redirect href={"/pages/login"} />;
  }
  return (
    <Box>
      <Text>Participant </Text>
      <Button action="negative" onPress={onLogout}>
        <ButtonText>logout</ButtonText>
      </Button>
    </Box>
  );
}
