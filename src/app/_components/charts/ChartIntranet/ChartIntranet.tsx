"use client";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { data } from "./data";

function ChartIntranet() {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="x" />
        <Tooltip labelStyle={{ color: "black" }} cursor={false} />
        <Area
          type="monotone"
          dataKey="y"
          stackId="1"
          stroke="#985EFF"
          fillOpacity={1}
          fill="#985EFF"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export { ChartIntranet };
