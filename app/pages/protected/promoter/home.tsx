import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  console.log("promoter home was loaded...");
  return (
    <SafeAreaView>
      <Box className="h-full">
        <Fab
          size="md"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
        >
          <FabIcon as={AddIcon} />
          <FabLabel>evento</FabLabel>
        </Fab>
      </Box>
    </SafeAreaView>
  );
}
