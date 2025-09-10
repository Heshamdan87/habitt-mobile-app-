import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PriorityData {
  name: string;
  value: number;
  completed: number;
  color: string;
}

interface PriorityChartProps {
  data: PriorityData[];
}

export function PriorityChart({ data }: PriorityChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        No priority data available for this period
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string, props: any) => [
              `${value} tasks (${props.payload.completed} completed)`,
              `${name} Priority`
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}