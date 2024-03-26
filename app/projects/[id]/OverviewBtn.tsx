'use client'
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const OverviewBtn = ({ id }: { id: string }) => {
  return (
    <Button>
      <Link href={`${id}/overview`}>Overview</Link>
    </Button>
  )
}

export default OverviewBtn