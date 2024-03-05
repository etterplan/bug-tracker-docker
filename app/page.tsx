import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const todo = await prisma.issue.count({
    where: { status: "TODO" },
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
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <Flex direction="column" gap="5">
        <LatestIssues />
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dash board",
  description: "View a summary of project issue",
};
