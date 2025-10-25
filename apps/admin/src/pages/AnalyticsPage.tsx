import { useGetCompanies, useGetScpis } from "api";
import { Building, FileText, Percent, Wallet } from "lucide-react";
import * as React from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "../components/ChartContainer";
import { StatCard } from "../components/StatCard";

// Define a type for chart data
type ChartData = { name: string; value: number };

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export const AnalyticsPage = () => {
  const companiesQuery = useGetCompanies();
  const scpisQuery = useGetScpis();

  // Combined loading state
  const isLoading = companiesQuery.isLoading || scpisQuery.isLoading;

  // (Memoized for Performance)

  const totalCapitalization = React.useMemo(() => {
    if (!scpisQuery.data) return 0;
    return scpisQuery.data.reduce(
      (acc, scpi) => acc + (scpi.capitalization || 0),
      0,
    );
  }, [scpisQuery.data]);

  const averageDistributionRate = React.useMemo(() => {
    if (!scpisQuery.data || scpisQuery.data.length === 0) return 0;
    const totalRate = scpisQuery.data.reduce(
      (acc, scpi) => acc + (scpi.distributionRate || 0),
      0,
    );
    return totalRate / scpisQuery.data.length;
  }, [scpisQuery.data]);

  const scpisByCompanyData: ChartData[] = React.useMemo(() => {
    if (!companiesQuery.data) return [];
    return companiesQuery.data
      .map((company) => ({
        name: company.name.replace(" AM", ""),
        value: company.scpis.length,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [companiesQuery.data]);

  const scpisByTypeData: ChartData[] = React.useMemo(() => {
    if (!scpisQuery.data) return [];
    const typeCounts = scpisQuery.data.reduce(
      (acc, scpi) => {
        acc[scpi.type] = (acc[scpi.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
  }, [scpisQuery.data]);

  return (
    <div className="animate-in fade-in-0 max-h-screen space-y-5 duration-500">
      <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>

      {/* Section 1: KPI Stat Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Companies"
          value={companiesQuery.data?.length ?? 0}
          icon={<Building className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Total SCPIs"
          value={scpisQuery.data?.length ?? 0}
          icon={<FileText className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Capitalization"
          value={`${(totalCapitalization / 1000).toFixed(2)} B€`}
          icon={<Wallet className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Distribution Rate"
          value={`${averageDistributionRate.toFixed(2)} %`}
          icon={<Percent className="h-4 w-4" />}
          isLoading={isLoading}
        />
      </div>

      {/* Section 2: Main Chart Visualizations */}
      <div className="grid h-full gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartContainer
            title="SCPIs per Management Company"
            description="Distribution of SCPIs across partner companies."
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={scpisByCompanyData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Number of SCPIs"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div>
          <ChartContainer
            title="SCPIs by Category"
            description="Breakdown of SCPI types available on the platform."
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scpisByTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {scpisByTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};
