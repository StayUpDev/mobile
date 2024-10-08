import { useAuth } from "@/app/context/AuthContext";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Page() {
  const { onLogout } = useAuth();
  return (
    <Box>
      <Text>Participant </Text>
      <Button action="negative" onPress={onLogout}>
        <ButtonText>logout</ButtonText>
      </Button>
    </Box>
  );
}
