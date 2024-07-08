'use client';
import { Box, Flex, Grid, Select } from '@radix-ui/themes';
import Comments from './Comments';
import History from './History';
import AddCommentPopover from './AddCommentPopover';
import { Comment, IssueHistory } from '@prisma/client';
import { useState } from 'react';

interface HistoryDropdownProps {
  comments: Comment[]
  history: IssueHistory[]
  issueId: number
  loggedIn: Boolean
}

const HistoryDropdown: React.FC<HistoryDropdownProps> = ({ comments, history, issueId, loggedIn}) => {
  const [view, setView] = useState('comments');
  return (
    <>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <Flex width="100%" justify="end" className="mb-4">
            <Select.Root onValueChange={setView} value={view}>
              <Select.Trigger>{view}</Select.Trigger>
              <Select.Content>
                <Select.Item value="comments">Comments</Select.Item>
                <Select.Item value="history">History</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
        </Box>
      </Grid>
      {view === "comments" ? (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
          <Box className="md:col-span-4">
            <Flex direction="column" gap="5" justify="center">
              <Comments comments={comments} />
              {loggedIn && (
                <Flex width="100%" justify="end" className="mb-4">
                  <AddCommentPopover issueId={issueId} />
                </Flex>
              )}
            </Flex>
          </Box>
        </Grid>
      ) : (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
          <Box className="md:col-span-4">
            <Flex direction="column" gap="5" justify="center">
              <History history={history} />
            </Flex>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default HistoryDropdown