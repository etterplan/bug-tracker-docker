import { Board } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
interface Props {
  boards: Board[];
}

const BoardList = ({ boards }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {boards.map((board) => (
          <Table.Row key={board.id}>
            <Table.Cell>
              <Link href={`/board/${board.id}`}>{board.name}</Link>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {board.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Board;
  className?: string;
}[] = [
  { label: "Name", value: "name" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default BoardList;
