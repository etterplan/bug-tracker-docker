import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuseStatusFilter from "./IssuseStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";

const IssuseAction = () => {
  return (
    <Flex justify="between">
      <IssuseStatusFilter />
      <IssueAssigneeFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuseAction;
