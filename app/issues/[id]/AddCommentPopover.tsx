"use client"
import { Box, Flex, Popover, Button, Avatar, TextArea } from "@radix-ui/themes";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";
import axios from "axios";
import { useState } from "react";
import ErrorMessage from "@/app/components/ErrorMessage";
import { commentSchema } from "@/app/validationSchema";

const AddCommentPopover = ({ issueId }: { issueId: number }) => {
  const { status, data: session } = useSession();
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleComment = async (event: React.MouseEvent) => {
  
    if (!session) {
      setError('You are not logged in.');
      event.preventDefault();
      return;
    }
  
    const validationResult = commentSchema.safeParse({ text: comment });
  
    if (!validationResult.success) {
      if (validationResult.error.formErrors.fieldErrors.text) {
        setError(validationResult.error.formErrors.fieldErrors.text.join(', '));
      }
      event.preventDefault();
      return;
    }
  
    try {
      await axios.post('/api/comments', {
        text: validationResult.data.text,
        issueId: issueId,
        userId: session.user?.id,
        userEmail: session.user?.email
      });
    } catch (error) {
      setError('An unexpected error occurred.');
      event.preventDefault();
    }
  }

  if (status === "loading") return <Skeleton height="2rem" width="13rem" />;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <ChatBubbleIcon width="16" height="16" />
          Add Comment
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="2">
          <Avatar
            size="2"
            src={session?.user?.image || undefined}
            fallback={<PersonIcon width="32" height="32" />}
            radius="full"
          />
          <Box grow="1">
            <TextArea
              placeholder="Write a comment…"
              style={{ height: 80 }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Flex gap="2" mt="2" justify="end">
              <Popover.Close>
                <Button size="1" onClick={handleComment} disabled={!comment}>
                  Comment
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export default AddCommentPopover