"use client";

import { CompanyCard } from "@/components/cards";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useGetCompanies } from "api";
import * as React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export const CompanySlider = () => {
  const { data: companies, isLoading, isError, error } = useGetCompanies();

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton className="h-[220px] w-full rounded-xl" />
        </SwiperSlide>
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full text-center text-red-500">
          <p>An error occurred fetching companies: {error.message}</p>
        </div>
      );
    }

    if (!companies || companies.length === 0) {
      return (
        <div className="text-muted-foreground col-span-full text-center">
          <p>No companies found.</p>
        </div>
      );
    }

    return companies.map((company) => (
      <SwiperSlide key={company.id} className="h-auto min-h-28 p-1">
        <CompanyCard company={company} />
      </SwiperSlide>
    ));
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto max-w-screen px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Our Partner Companies
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            We collaborate with the most reputable management companies in the
            market.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.5}
          navigation
          breakpoints={{
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-8"
        >
          {renderContent()}
        </Swiper>
      </div>
    </section>
  );
};
