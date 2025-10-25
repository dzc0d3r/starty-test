import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import * as React from "react";

interface ChartContainerProps {
  title: string;
  description: string;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ChartContainer = ({
  title,
  description,
  isLoading,
  children,
  className,
}: ChartContainerProps) => {
  return (
    <Card className={cn("h-full border-0 shadow-xl", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-54 w-full" />
        ) : (
          <div className="h-54 w-full">{children}</div>
        )}
      </CardContent>
    </Card>
  );
};
