import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import ProjectAction from "./ProjectAction";
import ProjectList from "./ProjectList";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();
  const unassignedBoards = await prisma.board.findMany({
    where: {
      project: null,
    },
  });

  return (
    <Flex direction="column" gap="3">
      <ProjectAction boards={unassignedBoards} />
      <ProjectList projects={projects} />
    </Flex>
  );
};

export default ProjectsPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Projects List",
  description: "View a list of projects",
};
