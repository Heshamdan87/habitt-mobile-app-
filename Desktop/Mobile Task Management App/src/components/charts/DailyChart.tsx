import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface DailyChartProps {
  data: Array<{
    date: string;
    created: number;
    completed: number;
  }>;
}

export function DailyChart({ data }: DailyChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Bar 
            dataKey="created" 
            fill="hsl(var(--chart-1))" 
            name="Created"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="completed" 
            fill="hsl(var(--chart-2))" 
            name="Completed"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}