import { LoadingSpinner } from "@/components/loading";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { getScpiById } from "api";
import {
  Briefcase,
  Building,
  Euro,
  Home,
  Percent,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import * as React from "react";
import { AssetChart } from "./_components/asset-chart";

// Helper for formatting numbers
const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  return `${value.toFixed(2)}%`;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

// Component that handles the data fetching
async function ScpiContent({ id }: { id: string }) {
  try {
    const scpi = await getScpiById(id);

    if (!scpi) {
      notFound();
    }

    const investmentMinimumValue =
      scpi.partPrice && scpi.subscriptionMinimum
        ? scpi.partPrice * scpi.subscriptionMinimum
        : null;

    const kpiCards = [
      {
        title: "Distribution Rate",
        value: formatPercentage(scpi.distributionRate),
        icon: <TrendingUp />,
      },
      {
        title: "Part Price",
        value: formatCurrency(scpi.partPrice),
        icon: <Euro />,
      },
      {
        title: "Min. Investment",
        value: formatCurrency(investmentMinimumValue),
        icon: <Wallet />,
      },
      {
        title: "Capitalization",
        value: `${scpi.capitalization?.toLocaleString("fr-FR") ?? "N/A"} M€`,
        icon: <Building />,
      },
      {
        title: "Occupancy Rate",
        value: formatPercentage(scpi.occupancyRate),
        icon: <Percent />,
      },
      {
        title: "Associates",
        value: scpi.associateCount?.toLocaleString("fr-FR") ?? "N/A",
        icon: <Users />,
      },
    ];

    return (
      <>
        <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
          {/* Section 1: Page Header */}
          <header className="mb-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {scpi.name}
                </h1>
                <h2 className="text-muted-foreground mt-2 text-lg">
                  Managed by{" "}
                  <Link
                    href={`/companies/${scpi.managementCompany.id}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    {scpi.managementCompany.name}
                  </Link>
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{scpi.type}</Badge>
                  <Badge variant="secondary">ISR</Badge>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" className="w-full sm:w-auto">
                  Simulate Investment
                </Button>
              </div>
            </div>
          </header>

          {/* Section 2: The KPI Dashboard */}
          <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {kpiCards.map((kpi) => (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {kpi.title}
                  </CardTitle>
                  <div className="text-muted-foreground">
                    {React.cloneElement(kpi.icon, { className: "h-4 w-4" })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Section 3: The Portfolio Overview */}
          <section className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">Investment Strategy</h3>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  The {scpi.name} fund focuses on a diversified portfolio of
                  assets across key European markets. Its strategy targets
                  high-yield properties in the office and retail sectors, with a
                  growing emphasis on logistics and healthcare facilities to
                  ensure stable, long-term returns for our investors.
                </p>
              </div>
              <Separator className="my-8" />
              <h4 className="mb-4 text-xl font-bold">Portfolio at a Glance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Home className="text-primary h-5 w-5" />{" "}
                  <div>
                    <strong>{scpi.buildingCount}</strong> Properties
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="text-primary h-5 w-5" />{" "}
                  <div>
                    <strong>{scpi.tenantCount}</strong> Tenants
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <h3 className="mb-4 text-2xl font-bold">Asset Allocation</h3>
              <Card>
                <CardContent className="pt-6">
                  <AssetChart />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4: Management Company Profile */}
          <section>
            <h3 className="mb-4 text-2xl font-bold">About the Manager</h3>
            <Link
              href={`/companies/${scpi.managementCompany.id}`}
              className="block"
            >
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{scpi.managementCompany.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {scpi.managementCompany.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </section>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error fetching SCPI:", error);
    notFound();
  }
}

// This is the main Server Component
export default async function ScpiDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScpiContent id={id} />
    </Suspense>
  );
}
