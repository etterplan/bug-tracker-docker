"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({
  itemsCount,
  pageSize: initialPageSize,
  currentPage,
}: Props) => {
  const router = useRouter();
  const searchParms = useSearchParams();

  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  const pageCount = Math.ceil(itemsCount / pageSize);

  const changePage = (page: number, newPageSize?: number) => {
    const params = new URLSearchParams(searchParms);
    params.set("page", page.toString());
    params.set(
      "pageSize",
      newPageSize ? newPageSize.toString() : pageSize.toString()
    );
    router.push("?" + params.toString());
  };

  const changePageSize = (newPageSize: string) => {
    const newSize = parseInt(newPageSize);
    setPageSize(newSize);
    changePage(1, newSize); // resets to first page when page size changes, this is probably good
  };

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="solid"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="solid"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="solid"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="solid"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
      <Select.Root value={pageSize.toString()} onValueChange={changePageSize}>
        <Select.Trigger placeholder="Change issues per page" />
        <Select.Content>
          <Select.Item value="5" key="5">
            5
          </Select.Item>
          <Select.Item value="10" key="10">
            10
          </Select.Item>
          <Select.Item value="15" key="15">
            15
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default Pagination;
