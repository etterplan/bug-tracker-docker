"use client";
import { Issue as PrismaIssue, User } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import IssueCard from "./IssueCard";
import DroppableBox from "./DroppableBox";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Issue = PrismaIssue & {
  assignedToUser: User | null;
};

type BoardLayoutProps = {
  openIssues: Issue[];
  inProgressIssues: Issue[];
  closedIssues: Issue[];
};

const BoardLayout: React.FC<BoardLayoutProps> = ({ openIssues, inProgressIssues, closedIssues }) => {
  const router = useRouter();
  const onDropIssue = async (issueId: string, status: string) => {
    try {
      const validStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
      if (validStatuses.includes(status)) {
        const checkedStatus = {
          status: status
        }
        await axios.patch(`/api/issues/${issueId}`, checkedStatus);
        router.refresh();
      }
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };
  return (
    <>
      <DroppableBox onDropIssue={onDropIssue} status="OPEN">
        <Text>OPEN</Text>
        {openIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </DroppableBox>
      <DroppableBox onDropIssue={onDropIssue} status="IN_PROGRESS">
        <Text>IN PROGRESS</Text>
        {inProgressIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </DroppableBox>
      <DroppableBox onDropIssue={onDropIssue} status="CLOSED">
        <Text>CLOSED</Text>
        {closedIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </DroppableBox>
      <Toaster />
    </>
  )
}

export default BoardLayout