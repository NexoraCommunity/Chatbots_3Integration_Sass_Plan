"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Props = {
  value: number;
};

const MAX = 600000;
const SIZE = 200; // base size biar proporsional

const data = [
  { name: "Kritis", value: 10, color: "#ef4444" },
  { name: "Menipis", value: 20, color: "#fca5a5" },
  { name: "Stabil", value: 40, color: "#4ade80" },
  { name: "Optimal", value: 30, color: "#15803d" },
];

export default function GaugeChart({ value }: Props) {
  const percentage = Math.min(value / MAX, 1);
  const needleAngle = 180 - percentage * 180;

  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const outerRadius = SIZE / 2;
  const innerRadius = outerRadius * 0.6;

  const rad = (Math.PI / 180) * needleAngle;
  const needleLength = outerRadius * 0.9;

  const x = cx + needleLength * Math.cos(rad);
  const y = cy - needleLength * Math.sin(rad);

  return (
    <div className="w-56 flex items-center justify-center">
      <ResponsiveContainer width="100%" aspect={2}>
        <PieChart width={SIZE} height={SIZE / 2}>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
            <circle cx={cx} cy={cy} r={4} fill="black" />
            <line
            className="z-20"
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="black"
              strokeWidth={1}
            />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
