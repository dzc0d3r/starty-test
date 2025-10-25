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
        <div className="bg-muted/40 relative mt-[-30] h-50 w-full rounded-b-lg">
          {company.logoUrl ? (
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              width={100}
              height={50}
              className="h-full w-full rounded-b-lg object-fill"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Building2 className="text-muted-foreground h-10 w-10" />
            </div>
          )}
        </div>
        <CardContent className="flex min-h-30 flex-grow flex-col p-4">
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
