import BoardAssigneeFilter from "./BoardAssigneeFilter"
import { Flex, Text } from "@radix-ui/themes";

const BoardFilters = () => {
  return (
    <Flex direction='column'>
      <Text>Filters:</Text>
      <BoardAssigneeFilter />
    </Flex>
  )
}

export default BoardFilters