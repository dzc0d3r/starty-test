"use client";

import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Dummy data for the chart. In a real application, this would come from the API.
const data = [
  { name: "Offices", value: 400 },
  { name: "Retail", value: 300 },
  { name: "Healthcare", value: 300 },
  { name: "Residential", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const AssetChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={(entry) =>
              `${entry.name} (${((entry.value / 1000) * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}M €`, "Value"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
