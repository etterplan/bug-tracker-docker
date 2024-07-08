import { Status } from "@prisma/client";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import React from "react";
import authOptions from "./auth/authOptions";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
  todo: number;
}
const IssueSummery = async ({ open, inProgress, closed, todo }: Props) => {
  const container: {
    label: string;
    value: number;
    status: Status;
    color: "gray" | "red" | "violet" | "green";
  }[] = [
    { label: "Todo", value: todo, status: "TODO", color: "gray" },
    { label: "Open", value: open, status: "OPEN", color: "red" },
    {
      label: "In-Progress",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "violet",
    },
    { label: "Closed", value: closed, status: "CLOSED", color: "green" },
  ];
  const session = await getServerSession(authOptions);
  return (
    <Flex gap="4">
      {container.map((status) => (
        <Card key={status.label} style={{ textAlign: "center" }}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={
                session
                  ? `/issues?status=${status.status}&userId=${session.user?.id}`
                  : `/issues?status=${status.status}`
              }
            >
              <Heading mb="2" size="4">
                {status.label}
              </Heading>
            </Link>
          </Flex>
          <Text size="1" className="font-bold">
            <Badge size="2" color={status.color}>
              {status.value}
            </Badge>
          </Text>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummery;
