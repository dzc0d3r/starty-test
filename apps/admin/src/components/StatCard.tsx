import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import * as React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  isLoading?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  description,
  isLoading,
  className,
}: StatCardProps & { className?: string }) => {
  if (isLoading) {
    return <Skeleton className="h-26 w-full rounded-xl" />;
  }

  return (
    <Card
      className={cn(
        "max-h-26 border-0 shadow-xl transition-all hover:shadow-2xl",
        className,
      )}
    >
      <CardHeader className="flex-column flex items-center">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="mt-[-5] text-lg font-bold">{value}</div>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
