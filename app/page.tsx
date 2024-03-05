import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";
import AssignedToMe from "./AssignedToMe";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
      assignedToUserId: session?.user?.id,
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
      assignedToUserId: session?.user?.id,
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
      assignedToUserId: session?.user?.id,
    },
  });
  const todo = await prisma.issue.count({
    where: {
      status: "TODO",
      assignedToUserId: session?.user?.id,
    },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummery
          open={open}
          inProgress={inProgress}
          closed={closed}
          todo={todo}
        />
        <IssueChart
          open={open}
          inProgress={inProgress}
          closed={closed}
          todo={todo}
        />
      </Flex>
      <Flex direction="column" gap="5">
        {session ? <AssignedToMe /> : <LatestIssues />}
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dash board",
  description: "View a summary of project issue",
};
