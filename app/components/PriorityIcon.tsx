import { Priority } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
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
    label: "medium",
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

const PriorityIcon = ({ priority }: { priority: Priority }) => {
  return (
    <Badge color={statusMap[priority].color}>{statusMap[priority].icon}</Badge>
  );
};

export default PriorityIcon;
