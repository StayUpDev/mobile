import { Text } from "@/components/ui/text";
import { getUsers, testToken } from "../client/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Center } from "@/components/ui/center";

export default function Page() {
  const queryClient = useQueryClient();
  const { error, data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  // console.log("data: ", data?.data);
  return <Text>{JSON.stringify(data?.data)}</Text>;
}
