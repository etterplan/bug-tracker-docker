import { Flex, Grid, Box } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import BoardLayout from "./BoardLayout";

export default async function Board() {
  const openIssues = await prisma.issue.findMany({
    where: {
      status: 'OPEN'
    },
    include: {
      assignedToUser: true,
    },
  });

  const inProgressIssues = await prisma.issue.findMany({
    where: {
      status: 'IN_PROGRESS'
    },
    include: {
      assignedToUser: true,
    },
  });

  const closedIssues = await prisma.issue.findMany({
    where: {
      status: 'CLOSED'
    },
    include: {
      assignedToUser: true,
    },
  });
  return (
    <BoardLayout openIssues={openIssues} inProgressIssues={inProgressIssues} closedIssues={closedIssues} />
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a summary of project issue",
};