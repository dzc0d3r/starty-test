import { ScpiCard } from "@/components/cards";
import * as React from "react";
import { SCPIResponse } from "schemas";

interface ScpiGridProps {
  scpis: SCPIResponse[];
}

export const ScpiGrid = ({ scpis }: ScpiGridProps) => {
  if (scpis.length === 0) {
    return (
      <div className="border-muted-foreground/30 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-24 text-center">
        <h3 className="text-xl font-semibold">No Results Found</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {scpis.map((scpi) => (
        <ScpiCard key={scpi.id} scpi={scpi} />
      ))}
    </div>
  );
};
