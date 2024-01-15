"use client"
import { Box, Flex, Text, Card, Badge, Avatar, Strong, DropdownMenu, Button } from "@radix-ui/themes";
import { DotsHorizontalIcon, PersonIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react";

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
                    <DropdownMenu.Item>Edit</DropdownMenu.Item>
                    <DropdownMenu.Item>Remove</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </Flex>
          </Flex>
          <Flex className="prose max-w-full pb-6" mt="4">
            <Text size="1">{comment.text}</Text>
          </Flex>
        </Flex>

      ))}
    </Flex>
  )
}

export default Comments