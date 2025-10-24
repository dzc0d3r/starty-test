import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import * as React from "react";
import { CompanyGrid } from "./_components/company-grid";

export default function CompaniesPage() {
  return (
    <>
      <main className="container mx-auto max-w-screen-xl px-4 py-12">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Our Trusted Partner Companies
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-xl">
            We partner with industry-leading management firms to bring you a
            curated selection of premier investment opportunities.
          </p>
        </header>

        <div className="mb-24">
          <CompanyGrid />
        </div>

        <section className="bg-muted/50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">
            Ready to Explore the Opportunities?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Now that you{"'"}ve met our partners, discover the high-performing
            SCPIs they manage.
          </p>
          <div className="mt-8">
            <Link href="/scpis">
              <Button size="lg" className="h-11 px-8 text-sm">
                Discover All SCPIs
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
