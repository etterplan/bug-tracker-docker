import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";
import IssueSearch from "./IssueSearch";

const IssueAction = () => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-between gap-3">
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <IssueStatusFilter />
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

export default IssueAction;
