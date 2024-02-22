import prisma from "@/prisma/client";
import { Prisma, Status } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import ShowBoard from "./ShowBoard";

type Issue = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

export default async function Board() {
  const issuesByStatus: Record<Status, Issue[]> = {
    [Status.TODO]: [],
    [Status.OPEN]: [],
    [Status.IN_PROGRESS]: [],
    [Status.CLOSED]: [],
  };

  const boardIssues = await prisma.issue.findMany({
    where: {
      boardId: 1,
    },
    include: {
      assignedToUser: true,
    },
  });
  boardIssues.forEach((issue) => {
    issuesByStatus[issue.status].push(issue);
  });

  for (const status in issuesByStatus) {
    issuesByStatus[status as Status].sort((a, b) => {
      //null positions being larger than any other number
      const aPosition = a.position !== null ? a.position : Infinity;
      const bPosition = b.position !== null ? b.position : Infinity;
      return aPosition - bPosition;
    });
  }

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
