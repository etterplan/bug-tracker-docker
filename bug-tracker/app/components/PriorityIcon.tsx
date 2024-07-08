"use client";
import { Priority } from "@prisma/client";
import { Badge, Select, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const statusMap: Record<
  Priority,
  {
    label: string;
    color: "red" | "green" | "iris" | "orange" | "sky";
  }
> = {
  HIGH: { label: "High", color: "red" },
  LOW: { label: "Low", color: "green" },
  MEDIUM: {
    label: "Medium",
    color: "iris"
  },
  BLOCKER: {
    label: "Blocker",
    color: "orange"
  },
  MINOR: { label: "Minor", color: "sky" },
};

const PriorityIcon = ({ priority, id }: { priority: Priority; id: number }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const getKeyByLabel = (label: string): Priority | undefined =>
    (Object.keys(statusMap) as Priority[]).find(
      (key) => statusMap[key].label === label
    );

  const changeStatus = async (value: string) => {
    try {
      await axios.patch("/api/issues/" + id, {
        priority: getKeyByLabel(value),
      });
      router.refresh();
    } catch (error) { }
  };
  return (
    <Select.Root
      size="1"
      value={statusMap[priority].label}
      onValueChange={changeStatus}
      disabled={!session}
    >
      <Select.Trigger color={statusMap[priority].color} variant="soft" />
      <Select.Content>
        {Object.entries(statusMap).map(([priority, { label, color }]) => (
          <Select.Item value={label} key={priority}>
            <Flex align='center' gap='1'>
              <Badge color={color}>{label}</Badge>
            </Flex>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PriorityIcon;
