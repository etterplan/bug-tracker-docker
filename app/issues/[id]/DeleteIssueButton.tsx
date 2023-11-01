import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <CrossCircledIcon />
      <Link href={`${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
};

export default DeleteIssueButton;
