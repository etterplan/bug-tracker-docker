'use client'
import UserComboBox from "@/app/components/UserComboBox"
import { useState } from 'react';
import { Flex, Button, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";

interface Props {
  projectId: number;
}

const AddUser = ({ projectId }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const { data: session } = useSession();
  const [isPatching, setIsPatching] = useState(false);
  const router = useRouter();

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleAddUser = async () => {
    if (!selectedUserId) return;
    try {
      setIsPatching(true)
      await axios.patch('/api/projects/' + projectId, {
        userId: selectedUserId
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Changes could not be saved.");
    } finally {
      setIsPatching(false);
    }
  };

  return (
    <>
      <Flex direction='column' py='1'>
        <Text weight='medium'>Add user to project</Text>
        <Flex justify='start' gap='2' align='center' my='1' wrap='wrap'>
          <UserComboBox onValueChange={handleUserChange} />
          <Button onClick={handleAddUser} disabled={!session || isPatching}>Add User to Project</Button>
        </Flex>
      </Flex>
      <Toaster />
    </>
  )
}

export default AddUser