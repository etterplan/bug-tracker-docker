"use client";
import { Card, Heading } from "@radix-ui/themes";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  todo: number;
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed, todo }: Props) => {
  const data = [
    { label: "Todo", value: todo },
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  return (
    <Card>
      <Heading mb="2" size="4">
        Scrum Chart
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.label}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
