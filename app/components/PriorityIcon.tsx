"use client";
import { Priority } from "@prisma/client";
import { Badge, Select, Tooltip, Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  RxArrowDown,
  RxDoubleArrowDown,
  RxDoubleArrowUp,
  RxDragHandleHorizontal,
  RxMinusCircled,
} from "react-icons/rx";
const statusMap: Record<
  Priority,
  {
    label: string;
    color: "red" | "green" | "iris" | "orange" | "sky";
    icon: any;
  }
> = {
  HIGH: { label: "High", color: "red", icon: <RxDoubleArrowUp size={14} /> },
  LOW: { label: "Low", color: "green", icon: <RxDoubleArrowDown size={14} /> },
  MEDIUM: {
    label: "Medium",
    color: "iris",
    icon: <RxDragHandleHorizontal size={14} />,
  },
  BLOCKER: {
    label: "Blocker",
    color: "orange",
    icon: <RxMinusCircled size={14} />,
  },
  MINOR: { label: "Minor", color: "sky", icon: <RxArrowDown size={14} /> },
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
        {Object.entries(statusMap).map(([priority, { label, icon, color }]) => (
          <Select.Item value={label} key={priority}>
            <Flex align='center' gap='1'>
              <Badge color={color}>{icon}</Badge>
              <Text>{label}</Text>
            </Flex>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PriorityIcon;
