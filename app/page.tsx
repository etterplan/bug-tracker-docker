import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import AssignedToMe from "./AssignedToMe";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const session = await getServerSession(authOptions);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummery open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <Flex direction="column" gap="5">
        {session && <AssignedToMe />}
        <LatestIssues />
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dash board",
  description: "View a summary of project issue",
};
