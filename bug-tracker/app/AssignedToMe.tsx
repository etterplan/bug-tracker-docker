import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";
import Link from "next/link";

const AssignedToMe = async () => {
  const session = await getServerSession(authOptions);
  const issues = await prisma.issue.findMany({
    where: { assignedToUserId: session?.user?.id },
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Assigned to Me
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} id={issue.id} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback={"?"}
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default AssignedToMe;
