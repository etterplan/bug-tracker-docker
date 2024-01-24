"use client"
import { Box, Flex, Popover, Button, Avatar, TextArea } from "@radix-ui/themes";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";
import axios from "axios";
import { useState } from "react";
import ErrorMessage from "@/app/components/ErrorMessage";
import { commentSchema } from "@/app/validationSchema";
import { useRouter } from 'next/navigation';

const AddCommentPopover = ({ issueId }: { issueId: number }) => {
  const { status, data: session } = useSession();
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  const handleComment = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (!session) {
      setError('You are not logged in.');
      return;
    }

    const validationResult = commentSchema.safeParse({ text: comment });

    if (!validationResult.success) {
      if (validationResult.error.formErrors.fieldErrors.text) {
        setError(validationResult.error.formErrors.fieldErrors.text.join(', '));
      }
      return;
    }

    try {
      setError('');
      setIsPosting(true);
      await axios.post('/api/comments', {
        text: validationResult.data.text,
        issueId: issueId,
        userId: session.user?.id,
        userEmail: session.user?.email,
        userImage: session.user?.image,
        userName: session.user?.name
      });
      setComment('');
      router.refresh();
      setOpen(false);
    } catch (error) {
      setError('An unexpected error occurred.');
    }finally {
      setIsPosting(false);
    }
  }

  if (status === "loading") return <Skeleton height="2rem" width="13rem" />;
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button variant="solid" color="blue">
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
              color="blue"
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Flex gap="2" mt="2" justify="end">
              <Button size="1" onClick={handleComment} disabled={!comment || isPosting} color="blue">
                Comment
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export default AddCommentPopover