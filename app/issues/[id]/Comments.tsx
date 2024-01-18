"use client"
import { Flex, Text, Badge, Avatar, Strong, DropdownMenu, Button, TextArea, AlertDialog } from "@radix-ui/themes";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [error, setError] = useState('')

  const deleteComment = async () => {
    if (selectedComment && session && session.user && session.user.id && session.user.id === selectedComment.userId) {
      try {
        await axios.delete("/api/comments/" + selectedComment.id);
        setOpenDialog(false);
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
        setError((error as Error).message);
      }
    }
  };

  return (
    <Flex direction="column" gap="6" justify="center">
      {[...comments].reverse().map((comment) => (
        <Flex key={comment.id} className="border-b-2 border-gray-200" direction="column" width="100%">
          <Flex justify="between" gap="3">
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
            <Flex align="center">
              {session && session.user && session.user.id === comment.userId && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft" size="1" color="blue">
                      <DotsHorizontalIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item color="blue" onSelect={() => { setEditing(comment.id); setEditText(comment.text); setError('');}}>Edit</DropdownMenu.Item>
                    <DropdownMenu.Item color="red"  onSelect={() => { setSelectedComment(comment); setOpenDialog(true); }}>Remove</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </Flex>
          </Flex>
          <Flex className="prose max-w-full pb-6" mt="4">
            {editing === comment.id ? (
              <Flex width="100%" direction="column" gap="2">
                <TextArea size="2" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <Flex width="100%" gap="2" justify="end">
                  <Flex>
                    <Text size="1" color="red">{error}</Text>
                  </Flex>
                  <Flex width="100%" gap="6" justify="end">
                    <Button variant="soft" color="gray" onClick={() => setEditing(null)}>Cancel</Button>
                    <Button color="blue" onClick={() => editComment(comment.id, comment.userId)}>Save Edit</Button>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Text size="1" className="overflow-ellipsis overflow-clip">{comment.text}</Text>
            )}
          </Flex>
          <AlertDialog.Root open={openDialog && selectedComment?.id === comment.id} onOpenChange={setOpenDialog}>
            <AlertDialog.Trigger>
              <Button style={{ display: 'none' }}></Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to delete this comment? This action cannot be undone.
              </AlertDialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray" onClick={() => setOpenDialog(false)}>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button color="red" onClick={deleteComment}>Delete Comment</Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      ))}
    </Flex>
  )
}

export default Comments