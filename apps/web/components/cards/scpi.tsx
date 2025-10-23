import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Building, FileText, Star } from "lucide-react";
import * as React from "react";
import { SCPIResponse } from "schemas";

interface ScpiCardProps {
  scpi: SCPIResponse;
}

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const formatPercentage = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  return `${value.toFixed(2)} %`;
};

export const ScpiCard = ({ scpi }: ScpiCardProps) => {
  // Simple calculation for investment minimum
  const investmentMinimum =
    scpi.partPrice && scpi.subscriptionMinimum
      ? scpi.partPrice * scpi.subscriptionMinimum
      : null;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <h3 className="text-lg font-bold">{scpi.name}</h3>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Building className="h-4 w-4" />
          <span>Managed by {scpi.managementCompany.name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{scpi.type}</Badge>
          {/* We can add more dynamic badges here in the future */}
          <Badge variant="secondary">ISR</Badge>
          <Badge variant="secondary">France</Badge>
        </div>
        <div className="bg-muted/50 grid grid-cols-3 gap-2 rounded-md p-3 text-center">
          <div>
            <p className="text-muted-foreground text-xs">Distribution Rate</p>
            <p className="text-primary font-bold">
              {formatPercentage(scpi.distributionRate)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Part Price</p>
            <p className="font-bold">{formatCurrency(scpi.partPrice)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Min. Investment</p>
            <p className="font-bold">{formatCurrency(investmentMinimum)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-3">
        <Button className="w-full">Simulate</Button>
        <Button variant="outline" className="w-full">
          <FileText className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
