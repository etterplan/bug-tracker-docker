"use client";
import { Status } from "@prisma/client";
import { Select, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const statusMap: Record<
  Status,
  { label: string; color: "gray" | "red" | "violet" | "green" }
> = {
  TODO: { label: "Todo", color: "gray" },
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status, id }: { status: Status; id: number }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const getKeyByLabel = (label: string): Status | undefined =>
    (Object.keys(statusMap) as Status[]).find(
      (key) => statusMap[key].label === label
    );

  const changeStatus = async (value: string) => {
    try {
      await axios.patch("/api/issues/" + id, {
        status: getKeyByLabel(value),
        position: id,
      });
      router.refresh();
    } catch (error) { }
  };

  return (
    <Select.Root
      size="1"
      value={statusMap[status].label}
      onValueChange={changeStatus}
      disabled={!session}
    >
      <Select.Trigger color={statusMap[status].color} variant="soft" />
      <Select.Content>
        <Select.Item value="Todo">
          <Flex align='center'>
            <Flex className={`bg-gray-300 rounded-full h-3.5 w-3.5 mr-2`}></Flex>
            <Text>Todo</Text>
          </Flex>
        </Select.Item>
        <Select.Item value="Open">
          <Flex align='center'>
            <Flex className={`bg-red-300 rounded-full h-3.5 w-3.5 mr-2`}></Flex>
            <Text>Open</Text>
          </Flex>
        </Select.Item>
        <Select.Item value="In Progress">
          <Flex align='center'>
            <Flex className={`bg-violet-300 rounded-full h-3.5 w-3.5 mr-2`}></Flex>
            <Text>In Progress</Text>
          </Flex>
        </Select.Item>
        <Select.Item value="Closed">
          <Flex align='center'>
            <Flex className={`bg-green-300 rounded-full h-3.5 w-3.5 mr-2`}></Flex>
            <Text>Closed</Text>
          </Flex>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusBadge;
