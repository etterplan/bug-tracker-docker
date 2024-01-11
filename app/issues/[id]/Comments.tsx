import { Box, Flex, Text, Card, Badge } from "@radix-ui/themes";

interface Comment {
  id: number;
  text: string;
  issueId: number | null;
  userEmail: string | null;
  userId: string | null;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      {[...comments].reverse().map((comment) => (
        <Box className="md:col-span-4" key={comment.id}>
          <Card className="prose max-w-full" mt="4">
            <Flex align="start" direction="column">
              <Badge color="blue">{comment.userEmail}</Badge>
              <Card className="prose max-w-full" mt="4">
                <Text size="1">{comment.text}</Text>
              </Card>
            </Flex>
          </Card>
        </Box>
      ))}
    </>
  )
}

export default Comments