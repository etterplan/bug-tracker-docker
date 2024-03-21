'use client'
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const BoardBtn = ({ id }: { id: string }) => {
  return (
    <Button>
      <Link href={`/projects/${id}`} prefetch={false}>Board</Link>
    </Button>
  )
}

export default BoardBtn