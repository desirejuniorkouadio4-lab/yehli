"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function InterventionsChart({ data }: { data: { month: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#6B7280" />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#6B7280" />
        <Tooltip
          cursor={{ fill: "#EAF4EC" }}
          contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 13 }}
          labelStyle={{ fontWeight: 600, color: "#1C1C2E" }}
        />
        <Bar dataKey="total" name="Demandes" fill="#1A6B2A" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
