'use client'
import { User } from "@prisma/client";
import UserComboBox from "@/app/components/UserComboBox"
import { useState } from 'react';
import { Flex, Button, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";
import useUser from "@/app/components/useUser";

interface Props {
  projectId: number;
  members?: User[];
}

const AddUser = ({ projectId, members }: Props) => {
  const { data: users } = useUser();
  const [selectedUserId, setSelectedUserId] = useState('');
  const { data: session } = useSession();
  const [isPatching, setIsPatching] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const router = useRouter();
  let sortedUsers: User[] = [];
  if (users && members) {
    const memberIds = members.map(member => member.id);
    sortedUsers = users.filter(user => !memberIds.includes(user.id));
  } else if (users && !members) {
    sortedUsers = users;
  }

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
      setUserAdded(true);
      setIsPatching(false);
      setSelectedUserId('')
    }
  };

  return (
    <>
      <Flex direction='column' py='1'>
        <Text weight='medium'>Add user to project</Text>
        <Flex justify='start' gap='2' align='center' my='1' wrap='wrap'>
          <UserComboBox onValueChange={handleUserChange} userAdded={userAdded} setUserAdded={setUserAdded} users={sortedUsers}/>
          <Button onClick={handleAddUser} disabled={!session || isPatching || !selectedUserId}>Add User to Project</Button>
        </Flex>
      </Flex>
      <Toaster />
    </>
  )
}

export default AddUser