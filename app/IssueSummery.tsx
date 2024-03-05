import { Status } from "@prisma/client";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
  todo: number;
}
const IssueSummery = ({ open, inProgress, closed, todo }: Props) => {
  const container: {
    label: string;
    value: number;
    status: Status;
    color: "gray" | "red" | "violet" | "green";
  }[] = [
    { label: "Open", value: open, status: "OPEN", color: "red" },
    {
      label: "In-Progress",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "violet",
    },
    { label: "Closed", value: closed, status: "CLOSED", color: "green" },
    { label: "Todo", value: todo, status: "TODO", color: "gray" },
  ];
  return (
    <Flex gap="4">
      {container.map((status) => (
        <Card key={status.label} style={{ textAlign: "center" }}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${status.status}`}
            >
              {status.label}
            </Link>
          </Flex>
          <Text size="5" className="font-bold">
            <Badge size="1" color={status.color}>
              {status.value}
            </Badge>
          </Text>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummery;
