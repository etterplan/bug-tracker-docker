import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";
import IssueSearch from "./IssueSearch";
import { PlusIcon } from "@radix-ui/react-icons";

const IssueAction = () => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-between gap-3">
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <IssueStatusFilter />
        <IssueAssigneeFilter />
      </Flex>
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <IssueSearch />
        <Link href="/issues/new">
          <Tooltip content="Add new Issue">
            <IconButton radius="full">
              <PlusIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Flex>
    </div>
  );
};

export default IssueAction;
