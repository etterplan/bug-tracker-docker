import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import ProjectAction from "./ProjectAction";

const ProjectsPage = () => {
  return (
    <Flex direction="column" gap="3">
      <ProjectAction />
    </Flex>
  );
};

export default ProjectsPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Projects List",
  description: "View a list of projects",
};
