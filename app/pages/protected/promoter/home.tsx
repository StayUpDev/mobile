import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export default function Page() {
  return (
    <Box>
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
  );
}
