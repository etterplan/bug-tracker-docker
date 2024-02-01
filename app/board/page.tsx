import { Flex, Grid, Box } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import BoardLayout from "./BoardLayout";

export const dynamic = "force-dynamic";

export default async function Board() {
  const openIssues = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
    include: {
      assignedToUser: true,
    },
  });

  const inProgressIssues = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
    include: {
      assignedToUser: true,
    },
  });

  const closedIssues = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Grid columns={{ initial: "1", sm: "3" }} gap="5">
      <BoardLayout
        openIssues={openIssues}
        inProgressIssues={inProgressIssues}
        closedIssues={closedIssues}
      />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a summary of project issue",
};
