'use client'
import { IconButton, Flex } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { User } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

interface Props {
  member: User;
}

const RemoveMemberBtn = ({ member }: Props) => {
  const [isPatching, setIsPatching] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleRemoveMember = async () => {
    if (!member) return;
    try {
      setIsPatching(true)
      await axios.patch('/api/projects/' + member.projectId, {
        removeUserId: member.id
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("User could not be removed.");
    } finally {
      setIsPatching(false);
    }
  };

  return (
    <Flex className='-mt-3 -mr-3' >
      <IconButton variant="soft" size='1' color='gray' onClick={handleRemoveMember} disabled={!session || isPatching}>
        <Cross1Icon />
      </IconButton>
      <Toaster />
    </Flex>
  )
}

export default RemoveMemberBtn