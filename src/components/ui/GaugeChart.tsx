// "use client";

// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// type Props = {
//   value: number;
// };

// const MAX = 600000;
// const SIZE = 200; // base size biar proporsional

// const data = [
//   { name: "Kritis", value: 10, color: "#ef4444" },
//   { name: "Menipis", value: 20, color: "#fca5a5" },
//   { name: "Stabil", value: 40, color: "#4ade80" },
//   { name: "Optimal", value: 30, color: "#15803d" },
// ];

// export default function GaugeChart({ value }: Props) {
//   const percentage = Math.min(value / MAX, 1);
//   const needleAngle = 180 - percentage * 180;

//   const cx = SIZE / 2;
//   const cy = SIZE / 2;
//   const outerRadius = SIZE / 2;
//   const innerRadius = outerRadius * 0.6;

//   const rad = (Math.PI / 180) * needleAngle;
//   const needleLength = outerRadius * 0.9;

//   const x = cx + needleLength * Math.cos(rad);
//   const y = cy - needleLength * Math.sin(rad);

//   return (
//     <div className="w-56 flex items-center justify-center">
//       <ResponsiveContainer width="100%" aspect={2}>
//         <PieChart width={SIZE} height={SIZE / 2}>
//           <Pie
//             data={data}
//             dataKey="value"
//             startAngle={180}
//             endAngle={0}
//             cx={cx}
//             cy={cy}
//             innerRadius={innerRadius}
//             outerRadius={outerRadius}
//             stroke="none"
//           >
//             {data.map((entry, index) => (
//               <Cell key={index} fill={entry.color} />
//             ))}
//           </Pie>
//             <circle cx={cx} cy={cy} r={4} fill="black" />
//             <line
//             className="z-20"
//               x1={cx}
//               y1={cy}
//               x2={x}
//               y2={y}
//               stroke="black"
//               strokeWidth={1}
//             />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
"use client";
import { Pie, PieChart, PieProps, Tooltip } from 'recharts';

// ================= DATA =================
const chartData = [
  { name: 'A', value: 70, fill: '#22c55e' },
  { name: 'B', value: 55, fill: '#eab308' },
  { name: 'C', value: 25, fill: '#3b82f6' },
];

// ================= UTILS =================
const total = chartData.reduce((a, b) => a + b.value, 0);

// convert value → angle (0–180)
const valueToAngle = (value: number) => {
  return 180 - (value / total) * 180;
};

// ================= NEEDLE =================
const NeedleOverlay = ({
  cx,
  cy,
  angle,
  length = 80,
}: {
  cx: number;
  cy: number;
  angle: number;
  length?: number;
}) => {
  return (
    <g
      style={{
        transform: `rotate(${-angle}deg)`,
        transformOrigin: `${cx}px ${cy}px`,
        transition: 'transform 0.6s ease',
      }}
    >
      <circle cx={cx} cy={cy} r={5} fill="#111827" />
      <line
        x1={cx}
        y1={cy}
        x2={cx + length}
        y2={cy}
        stroke="#111827"
        strokeWidth={2}
      />
    </g>
  );
};

// ================= CURVED OUTER LABEL =================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCurvedOuterLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, name, value, fill } = props;

  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      fill={fill}
    >
      {name}: {value}
    </text>
  );
};

// ================= HALF PIE =================
const HalfPie = (props: PieProps) => (
  <Pie
    {...props}
    stroke="none"
    dataKey="value"
    startAngle={180}
    endAngle={0}
    data={chartData}
    cx={160}
    cy={140}
    innerRadius={75}
    outerRadius={110}
    labelLine={false}
    label={renderCurvedOuterLabel}
    isAnimationActive
  />
);

// ================= MAIN =================
export default function GaugeHalfPie() {
  const pointerValue = 129; // ganti sesuai kebutuhan

  const angle = valueToAngle(pointerValue);

  return (
    <PieChart width={360} height={220} style={{ margin: '0 auto' }}>
      <HalfPie />

      {/* Always visible needle */}
      <NeedleOverlay cx={160} cy={140} angle={angle} />

      <Tooltip />
    </PieChart>
  );
}