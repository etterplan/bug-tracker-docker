import { Metadata } from "next";
import { Grid } from "@radix-ui/themes";
import BoardBtn from "./BoardBtn";

interface Props {
  params: { id: string };
  searchParams: { userId: string };
}

export default async function Overview({ params, searchParams }: Props) {

  return (
    <>
      <Grid columns={{ initial: "1", sm: "4" }} gap="3" className="mb-10">
        <BoardBtn id={params.id} />
      </Grid>
      <div>
        Overview
      </div>
    </>

  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Overview",
  description: "View Overview of Project",
};