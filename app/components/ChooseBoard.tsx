import { Board } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useState } from "react";
interface Props {
  boards: Board[];
  onSelectBoard: (boardId: string | null) => void;
}

const ChooseBoard = ({ boards, onSelectBoard }: Props) => {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const assignBoard = (value: string) => {
    setSelectedBoardId(value);
    onSelectBoard(value === "unassigned" ? null : value);
  };

  return (
    <Select.Root defaultValue={"unassigned"} onValueChange={assignBoard}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {boards?.map((board) => (
            <Select.Item value={board.id.toString()} key={board.id}>
              {board.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default ChooseBoard;
