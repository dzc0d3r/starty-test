"use client";

import { ScpiCard } from "@/components/cards";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useGetScpis } from "api";
import Link from "next/link";
import * as React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export const ScpiOpportunities = () => {
  const { data: scpis, isLoading, isError, error } = useGetScpis();

  const renderContent = () => {
    if (isLoading) {
      // Show skeleton loaders while data is fetching
      return Array.from({ length: 3 }).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton className="h-[380px] w-full rounded-xl" />
        </SwiperSlide>
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full text-center text-red-500">
          <p>An error occurred: {error.message}</p>
        </div>
      );
    }

    if (!scpis || scpis.length === 0) {
      return (
        <div className="text-muted-foreground col-span-full text-center">
          <p>No opportunities found at the moment.</p>
        </div>
      );
    }

    return scpis.map((scpi) => (
      <SwiperSlide key={scpi.id} className="h-auto p-1">
        <ScpiCard scpi={scpi} />
      </SwiperSlide>
    ));
  };

  return (
    <section className="bg-muted/20 w-full py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto max-w-screen px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Our SCPI Opportunities
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Explore a curated selection of high-performing real estate
            investment funds.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.2}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="pb-8"
        >
          {renderContent()}
        </Swiper>

        <div className="mt-8 text-center">
          <Link href="/scpis">
            <Button size="lg" variant="outline">
              Discover All SCPIs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
