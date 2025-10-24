import { ScpiCard } from "@/components/cards/scpi";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@workspace/ui/components/button";
import { getCompanyById } from "api";
import { Briefcase, Building2, Gem, Home, Users } from "lucide-react"; // Removed unused icons
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";

export default async function CompanyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }
  const enrichedScpis = company.scpis.map((scpi) => ({
    ...scpi,
    managementCompany: {
      id: company.id,
      name: company.name,
      description: company.description,
      logoUrl: company.logoUrl,
      address: company.address,
      totalAssetsUnderManagement: company.totalAssetsUnderManagement,
      fundCount: company.fundCount,
      majorityShareholder: company.majorityShareholder,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    },
  }));

  const metrics = [
    {
      label: "Assets Under Management",
      value: `${company.totalAssetsUnderManagement?.toLocaleString("fr-FR") ?? "N/A"} M€`,
      icon: <Gem />,
    },
    {
      label: "Funds Managed",
      value: company.fundCount ?? "N/A",
      icon: <Briefcase />,
    },
    { label: "SCPIs on Platform", value: company.scpis.length, icon: <Home /> },
    {
      label: "Majority Shareholder",
      value: company.majorityShareholder ?? "N/A",
      icon: <Users />,
    },
  ];

  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Header Section */}
      <header className="mb-16 grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
        <div className="bg-muted/30 relative flex h-40 w-full items-center justify-center rounded-lg md:h-full">
          {company.logoUrl ? (
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              fill
              className="w-full rounded-lg object-fill shadow-lg"
            />
          ) : (
            <Building2 className="text-muted-foreground h-16 w-16" />
          )}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {company.name}
          </h1>
          <p className="text-muted-foreground mt-4 md:text-lg">
            {company.description}
          </p>
          {company.address && (
            <p className="text-muted-foreground mt-4 text-sm font-medium">
              {company.address}
            </p>
          )}
        </div>
      </header>

      {/* Metrics Bar Section */}
      <section className="bg-muted/50 mb-16 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="text-primary mx-auto mb-2 h-8 w-8">
                {React.cloneElement(metric.icon, { className: "h-8 w-8" })}
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-muted-foreground text-xs tracking-wider uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Managed SCPIs Section */}
      <section className="mb-24">
        <h2 className="mb-8 text-3xl font-bold tracking-tighter">
          SCPIs Managed by {company.name}
        </h2>
        {enrichedScpis.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* We now map over the 'enrichedScpis' array */}
            {enrichedScpis.map((scpi) => (
              <ScpiCard key={scpi.id} scpi={scpi} />
            ))}
          </div>
        ) : (
          <div className="border-muted-foreground/30 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-24 text-center">
            <h3 className="text-xl font-semibold">No SCPIs Listed</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {company.name} does not currently have any SCPIs listed on our
              platform.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter">
          Explore Other Partners
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
          Discover the full range of management companies we collaborate with.
        </p>
        <div className="mt-8">
          <Link href="/companies">
            <Button size="lg" variant="outline" className="h-11 px-8 text-sm">
              View All Companies
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
