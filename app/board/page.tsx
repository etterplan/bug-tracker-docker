import { Grid } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import BoardLayout from "./BoardLayout";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type Issue = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  }
}>;

export default async function Board() {
  const openIssues = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
    include: {
      assignedToUser: true,
    },
    orderBy: [
      { id: 'asc' },
    ],
  });

  const inProgressIssues = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
    include: {
      assignedToUser: true,
    },
    orderBy: [
      { id: 'asc' },
    ],
  });

  const closedIssues = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
    include: {
      assignedToUser: true,
    },
    orderBy: [
      { id: 'asc' },
    ],
  });

  const rearrangeIssues = (issues: Issue[]): Issue[] => {
    const sortedIssues: (Issue | null)[] = new Array(issues.length).fill(null);

    issues.forEach((issue) => {
      if (issue.boardPosition !== null && issue.boardPosition < issues.length) {
        sortedIssues[issue.boardPosition] = issue;
      }
    });

    issues.forEach((issue) => {
      if (issue.boardPosition === null || issue.boardPosition >= issues.length) {
        const nullIndex = sortedIssues.indexOf(null);
        if (nullIndex !== -1) {
          sortedIssues[nullIndex] = issue;
        } else {
          sortedIssues.push(issue);
        }
      }
    });

    return sortedIssues.filter(issue => issue !== null) as Issue[];
  };

  return (
    <Grid columns={{ initial: "1", sm: "3" }} gap="5">
      <BoardLayout
        openIssues={rearrangeIssues(openIssues)}
        inProgressIssues={rearrangeIssues(inProgressIssues)}
        closedIssues={rearrangeIssues(closedIssues)}
      />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a summary of project issue",
};
