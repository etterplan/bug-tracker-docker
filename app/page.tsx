import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import { Status } from "@prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: Status.OPEN } });
  const closed = await prisma.issue.count({ where: { status: Status.CLOSED } });
  const inProgress = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });

  return (
    <>
      <IssueSummery open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </>
  );
}
