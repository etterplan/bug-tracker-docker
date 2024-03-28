'use client'
import { Card, Flex, Heading, Text, Box, Button, TextArea } from '@radix-ui/themes';
import ProjectStatusBadge from '../../components/ProjectStatusBadge'
import { Project } from "@prisma/client";
import { useState } from 'react'
import axios from "axios";

interface Props {
  project: Project;
}

const ProjectInfo = ({ project }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(project.description)
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const handleSaveClick = async () => {
    try {

      await axios.patch("/api/projects/" + project.id, { description: description });


    } catch (error) {
      setError((error as Error).message);
    }
    setIsEditing(false)
  }

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
        {isEditing ? (
          <Flex direction='column'>
            <TextArea value={description} onChange={handleDescriptionChange} />
            <Flex justify='end'>
              <Button onClick={handleSaveClick}>Save</Button>
            </Flex>
          </Flex>
        ) : (
          <Flex direction='column'>
            <Text>{description}</Text>
            <Flex justify='end'>
              <Button onClick={handleEditClick}>Edit</Button>
            </Flex>
          </Flex>
        )}
      </Card>
    </Box>
  )
}

export default ProjectInfo