"use client"
import { Flex, Text, Badge, Avatar, Strong, DropdownMenu, Button, TextArea, Box } from "@radix-ui/themes";
import { DotsHorizontalIcon, PersonIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from 'react';

interface Comment {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  issueId: number | null;
  userEmail: string | null;
  userId: string | null;
  userName: string | null;
  userImage: string | null;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const { data: session } = useSession();
  const route = useRouter();
  const [editing, setEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const deleteComment = async (id: number, userId: string | null) => {
    if (session && session.user && session.user.id && session.user.id === userId) {
      try {
        await axios.delete("/api/comments/" + id);
        route.refresh();
      } catch (error) {
        console.error(error)
      }
    }
  };

  const editComment = async (id: number, userId: string | null) => {
    if (session && session.user && session.user.id && session.user.id === userId) {
      try {
        await axios.patch("/api/comments/" + id, { text: editText });
        setEditing(null);
        route.refresh();
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <Flex direction="column" gap="6" justify="center">
      {[...comments].reverse().map((comment) => (
        <Flex key={comment.id} className="border-b-2 border-gray-200" direction="column" width="100%">
          <Flex justify="between">
            <Flex align="center" gap="3">
              <Avatar
                size="2"
                src={comment.userImage || undefined}
                fallback={<PersonIcon width="32" height="32" />}
                radius="full"
              />
              <Text size="1"><Strong>{comment.userName}</Strong></Text>
              <Badge color="blue">{comment.createdAt.toDateString()}</Badge>
            </Flex>
            <Flex>
              {session && session.user && session.user.id === comment.userId && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft" size="1" color="blue">
                      <DotsHorizontalIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item onSelect={() => { setEditing(comment.id); setEditText(comment.text); }}>Edit</DropdownMenu.Item>
                    <DropdownMenu.Item onSelect={() => deleteComment(comment.id, comment.userId)}>Remove</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </Flex>
          </Flex>
          <Flex className="prose max-w-full pb-6" mt="4">
            {editing === comment.id ? (
              <Flex width="100%" direction="column" gap="2">
                <TextArea size="2" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <Flex width="100%" gap="6" justify="end">
                  <Button onClick={() => setEditing(null)}>Cancel</Button>
                  <Button onClick={() => editComment(comment.id, comment.userId)}>Save</Button>
                </Flex>
              </Flex>
            ) : (
              <Text size="1">{comment.text}</Text>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default Comments