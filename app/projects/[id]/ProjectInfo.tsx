'use client'
import { Card, Flex, Heading, Text, Box } from '@radix-ui/themes';
import ProjectStatusBadge from '../../components/ProjectStatusBadge'
import { Project } from "@prisma/client";
import EditProjectButton from './EditProjectButton';

interface Props {
  project: Project;
}

const ProjectInfo = ({ project }: Props) => {
  return (
    <Box className="md:col-span-4">
      <Heading>{project.name}</Heading>
      <Flex className="space-x-3" mt="2">
        <Text>Created: {project.createdAt.toDateString()}</Text>
        <ProjectStatusBadge status={project.status} id={project.id} />
      </Flex>
      <Flex className="space-x-3" mb="2">
        <Text>Updated: {project.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" my="1">
        <Text>{project.description}</Text>
      </Card>
      <EditProjectButton projectId={project.id}/>
    </Box>
  )
}

export default ProjectInfo