import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuseStatusFilter from "./IssuseStatusFilter";

const IssuseAction = () => {
  return (
    <Flex mb="5" justify="between">
      <IssuseStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuseAction;
