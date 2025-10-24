import { Card, CardContent } from "@workspace/ui/components/card";
import { ArrowRight, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { CompanyResponseWithScpis } from "schemas";

interface CompanyCardProps {
  company: CompanyResponseWithScpis;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Link href={`/companies/${company.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="bg-muted/30 relative h-32 w-full">
          {company.logoUrl ? (
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              width={150}
              height={250}
              className="h-full w-full rounded-b-md object-cover p-1"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Building2 className="text-muted-foreground h-10 w-10" />
            </div>
          )}
        </div>
        <CardContent className="flex min-h-36 flex-grow flex-col p-4">
          <h3 className="flex-grow text-lg font-bold">{company.name}</h3>
          <div className="text-primary mt-4 flex items-center text-sm font-medium">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
