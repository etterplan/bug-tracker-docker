'use client'
import { Card, Flex, Heading, Text, Box, Button, TextArea } from '@radix-ui/themes';
import ProjectStatusBadge from '../../components/ProjectStatusBadge'
import { Project as PrismaProject, User } from "@prisma/client";
import { useState, useRef, useEffect } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AddUser from './AddUser';
import ShowMembers from './ShowMembers';

interface Project extends PrismaProject {
  members?: User[];
}

interface Props {
  project: Project;
}

const ProjectInfo = ({ project }: Props) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState(project.description)
  const [tempDescription, setTempDescription] = useState(project.description);
  const [error, setError] = useState('');
  const route = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const projectId = project.id;
  const members = project.members

  useEffect(() => {
    if (isEditing) {
      const textarea = textAreaRef.current;
      textarea?.focus();
      const value = textarea?.value;
      textarea?.setSelectionRange(value?.length || 0, value?.length || 0);
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true)
    setTempDescription(description);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempDescription(event.target.value);
  }

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {

      await axios.patch("/api/projects/" + projectId, { description: tempDescription })
        .then(() => {
          setDescription(tempDescription);
        });

      setIsEditing(false)
      route.refresh();
    } catch (error) {
      setError((error as Error).message);
    }
    setIsLoading(false);
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempDescription(description);
    setError('')
  }

  return (
    <Box className="md:col-span-4">
      <Heading>{project.name}</Heading>
      <Flex className="space-x-3" mt="2">
        <Text>Created: {project.createdAt.toDateString()}</Text>
        <ProjectStatusBadge status={project.status} id={projectId} />
      </Flex>
      <Flex className="space-x-3" mb="2">
        <Text>Updated: {project.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" my="1">
        {isEditing ? (
          <Flex direction='column'>
            <Flex direction='column' pb='3'>
              <TextArea ref={textAreaRef} value={tempDescription} onChange={handleDescriptionChange} autoFocus />
            </Flex>
            <Flex>
              <Text size="1" color="red">
                {error}
              </Text>
            </Flex>
            <Flex justify='end' gap='2'>
              <Button color='gray' variant='soft' onClick={handleCancelClick} >Cancel</Button>
              <Button onClick={handleSaveClick} disabled={isLoading}>Save</Button>
            </Flex>
          </Flex>
        ) : (
          <Flex direction='column'>
            <Flex direction='column' pb='3'>
              <Text>{description}</Text>
            </Flex>
            {session &&
              session.user && (
                <Flex justify='end'>
                  <Button onClick={handleEditClick}>Edit</Button>
                </Flex>
              )}
          </Flex>
        )}
      </Card>
      <AddUser projectId= {projectId}/>
      <ShowMembers members= {members}/>
    </Box>
  )
}

export default ProjectInfo
