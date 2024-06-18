import { SearchParamProps } from "@/types";
import React from "react";
import Collection from "./Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";

const Events = async ({
  searchParams,
}: {
  searchParams: SearchParamProps["searchParams"];
}) => {
  const page = Number(searchParams.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">
        Trust by <br /> Thousands of Events
      </h2>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search />
        <CategoryFilter />
      </div>

      <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={1}
        totalPages={events?.totalPages}
      />
    </section>
  );
};

export default Events;
