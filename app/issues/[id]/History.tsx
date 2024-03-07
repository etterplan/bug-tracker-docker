import { IssueHistory, Action } from '@prisma/client';
import { Flex, Badge, Text } from '@radix-ui/themes';

interface HistoryProps {
  history: IssueHistory[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <Flex direction='column' gap='6' justify='center'>
      {[...history].reverse().map((history) => {
        let actionText = '';
        switch (history.action) {
          case Action.CREATED:
            actionText = `${history.userName} created issue with title: "${history.newValue}".`;
            break;
          case Action.STATUS_CHANGE:
            actionText = `${history.userName} changed status to: "${history.newValue}".`;
            break;
          case Action.PRIORITY_CHANGE:
            actionText = `${history.userName} changed priority from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          case Action.ASSIGNEE_CHANGE:
            if (history.newValue === null) {
              actionText = `${history.userName} unassigned the current assignee from this issue.`;
            } else {
              actionText = `${history.userName} assigned "${history.newValue}" to this issue.`;
            }
            break;
          case Action.COMMENT_ADD:
            actionText = `${history.userName} added a comment.`;
            break;
          case Action.COMMENT_DELETE:
            actionText = `${history.userName} deleted his comment.`;
            break;
          case Action.COMMENT_EDIT:
            actionText = `${history.userName} edited his comment from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          case Action.DESCRIPTION_CHANGE:
            actionText = `${history.userName} changed issue description from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          case Action.TITLE_CHANGE:
            actionText = `${history.userName} changed issue title from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          default:
            actionText = `${history.userName} performed an action.`;
        }

        return (
          <Flex
            key={history.id}
            className="border-b-2 border-gray-200"
            direction="column"
            width="100%"
          >
            <Flex align="center" gap="3">
              <Badge color="blue">{history.createdAt.toDateString()}</Badge>
            </Flex>
            <Flex className="prose max-w-full pb-6" mt="4">
              <Text size="1" className="overflow-ellipsis overflow-clip">
                {actionText}
              </Text>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default History;