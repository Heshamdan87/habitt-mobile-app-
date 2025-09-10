import React from 'react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface CategoryData {
  name: string;
  total: number;
  completed: number;
  rate: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="space-y-4">
      {data.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{category.name}</span>
              <Badge variant="outline" className="text-xs">
                {category.completed}/{category.total}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {Math.round(category.rate)}%
            </span>
          </div>
          <Progress value={category.rate} className="h-2" />
        </div>
      ))}
      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No category data available for this period
        </div>
      )}
    </div>
  );
}