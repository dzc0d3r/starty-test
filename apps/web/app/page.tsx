import { HeroSection, ScpiOpportunities } from "./_components";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <HeroSection />
        <ScpiOpportunities />
      </div>
    </div>
  );
}
