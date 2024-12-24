"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

const config: ChartConfiguration<'line', number[], string> = {
  type: 'line', // Use a specific chart type, not a generic string
  data: {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Price Movement',
        data: [10, 20, 30, 40],
        borderColor: '#36A2EB',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};


export default function TradingChart({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const newChart = new Chart(ctx!, config);
      setChart(newChart);

      // Clean up the chart on unmount
      return () => {
        newChart.destroy();
      };
    }
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/3] w-full max-w-[600px] rounded-lg border bg-background p-4 shadow-lg",
        className,
      )}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
