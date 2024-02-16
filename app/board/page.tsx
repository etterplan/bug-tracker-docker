import prisma from "@/prisma/client";
import { Prisma, Status } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import ShowBoard from "./ShowBoard";

export const dynamic = "force-dynamic";

type Issue = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

export default async function Board() {
  /* const openIssues = await prisma.issue.findMany({
    where: {
      status: "OPEN",
    },
    include: {
      assignedToUser: true,
    },
    orderBy: [{ id: "asc" }],
  });

  const inProgressIssues = await prisma.issue.findMany({
    where: {
      status: "IN_PROGRESS",
    },
    include: {
      assignedToUser: true,
    },
    orderBy: [{ id: "asc" }],
  });

  const closedIssues = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
    },
    include: {
      assignedToUser: true,
    },
    orderBy: [{ id: "asc" }],
  });

  const rearrangeIssues = (issues: Issue[]): Issue[] => {
    const sortedIssues: (Issue | null)[] = new Array(issues.length).fill(null);

    issues.forEach((issue) => {
      if (issue.position !== null && issue.position < issues.length) {
        sortedIssues[issue.position] = issue;
      }
    });

    issues.forEach((issue) => {
      if (issue.position === null || issue.position >= issues.length) {
        const nullIndex = sortedIssues.indexOf(null);
        if (nullIndex !== -1) {
          sortedIssues[nullIndex] = issue;
        } else {
          sortedIssues.push(issue);
        }
      }
    });

    return sortedIssues.filter((issue) => issue !== null) as Issue[];
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
*/
  const issuesByStatus: Record<Status, Issue[]> = {
    [Status.TODO]: [],
    [Status.OPEN]: [],
    [Status.IN_PROGRESS]: [],
    [Status.CLOSED]: [],
  };

  const boardIssues = await prisma.issue.findMany({
    where: {
      boardId: 7,
    },
  });
  boardIssues.forEach((issue) => {
    issuesByStatus[issue.status].push(issue);
  });

  return (
    <Grid columns={{ initial: "1", sm: "4" }} gap="3">
      <ShowBoard issueList={issuesByStatus} />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a summary of project issue",
};
