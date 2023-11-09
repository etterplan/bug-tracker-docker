import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: Status.OPEN } });
  const closed = await prisma.issue.count({ where: { status: Status.CLOSED } });
  const inProgress = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummery open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
