import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuseStatusFilter from "./IssuseStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";
import IssueSearch from "./IssueSearch";

const IssuseAction = () => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-between gap-3">
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <IssuseStatusFilter />
        <IssueAssigneeFilter />
      </Flex>
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <IssueSearch />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
    </div>
  );
};

export default IssuseAction;
