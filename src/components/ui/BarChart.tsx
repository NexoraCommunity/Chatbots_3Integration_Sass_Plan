"use client";

import { Bar } from "react-chartjs-2";
import "@/src/lib/chart";

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Responed Message",
      data: [70, 35, 120, 150, 200, 250, 100],
      backgroundColor: "#61EFDA",
      borderRadius: 10,
    },
    {
      label: "Token Usage",
      data: [100, 150, 200, 180, 250, 300, 220],
      backgroundColor: "#499EFF",
      borderRadius: 10,
    },
  ],
};


const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      display: true, 
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: { size: 12 }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  // Use a smaller bar thickness or let it auto-calculate for better mobile fit
  maxBarThickness: 40,
  categoryPercentage: 0.8,
  barPercentage: 0.6,
};

export default function BarChartDashboard() {
  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
}
