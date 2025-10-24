import * as React from "react";
import { ScpiFilterableList } from "./_components/scpi-filterable-list";

export default function Page() {
  return (
    <>
      <main className="relative container mx-auto max-w-screen px-4 py-4">
        <ScpiFilterableList />
      </main>
    </>
  );
}
