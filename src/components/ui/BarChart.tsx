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
    legend: { display: true , position: "top" as const},
  },
  barThickness: 50,
};

export default function BarChartDashboard() {
  return (
    <div className="bg-white px-10 py-5 rounded-xl h-full">
      <h2 className="font-normal text-[#655E5E] mb-4">Pesan terbalas & penggunaan token</h2>
      <div className="flex justify-center items-center h-full w-full pb-10">
        <Bar data={data} options={options} className="" />
      </div>
    </div>
  );
}
