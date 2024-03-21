import prisma from "@/prisma/client";
import { Metadata } from "next";
import { Grid } from "@radix-ui/themes";
import BoardBtn from "./BoardBtn";
import ProjectInfo from "./ProjectInfo";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams: { userId: string };
}

export default async function Overview({ params, searchParams }: Props) {
  const projectId = Number(params.id)
  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    },
    include: {
      
    },
  });
  if (!project) notFound();
  return (
    <>
      <Grid columns={{ initial: "1", sm: "4" }} gap="3" className="mb-10">
        <BoardBtn id={params.id} />
      </Grid>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <ProjectInfo project= {project} />
      </Grid>
    </>

  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Overview",
  description: "View Overview of Project",
};