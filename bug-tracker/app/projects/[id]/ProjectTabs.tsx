'use client'
import { Tabs, Grid } from '@radix-ui/themes'
import BoardFilters from './BoardFilters'
import ShowBoard from './ShowBoard'
import ProjectInfo from './ProjectInfo'
import { Status } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Project } from "@prisma/client";

type Issue = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

interface ProjectTabsProps {
  issuesByStatus: Record<Status, Issue[]>;
  project: Project;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ issuesByStatus, project }) => {
  return (
    <Tabs.Root defaultValue="board">
      <Tabs.List className='mb-3'>
        <Tabs.Trigger value="board">Board</Tabs.Trigger>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="board">
        <Grid columns={{ initial: "1", sm: "6" }} gap="3" className="mb-10">
          <BoardFilters />
        </Grid>
        <Grid columns={{ initial: "1", sm: "4" }} gap="3">
          <ShowBoard issueList={issuesByStatus} />
        </Grid>
      </Tabs.Content>

      <Tabs.Content value="overview">
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
          <ProjectInfo project={project} />
        </Grid>
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default ProjectTabs