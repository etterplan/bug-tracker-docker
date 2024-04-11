import prisma from "@/prisma/client";
import { Prisma, Status } from "@prisma/client";
import { Metadata } from "next";
import ProjectTabs from "./ProjectTabs";
import { notFound } from "next/navigation";

type Issue = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;
interface Props {
  params: { id: string };
  searchParams: { userId: string };
}

export const dynamic = "force-dynamic";

export default async function ViewBoard({ params, searchParams }: Props) {

  const projectId = Number(params.id)
  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    },
    include: {
      members: true,
    },
  });
  if(!project) return(notFound())

  const issuesByStatus: Record<Status, Issue[]> = {
    [Status.TODO]: [],
    [Status.OPEN]: [],
    [Status.IN_PROGRESS]: [],
    [Status.CLOSED]: [],
  };

  const userId = searchParams.userId;
  const boardId = parseInt(params.id);
  const where = { boardId, assignedToUserId: userId };
  const boardIssues = await prisma.issue.findMany({
    where: {
      ...where,
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
      < ProjectTabs issuesByStatus={issuesByStatus} project= {project}/>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a board",
};
