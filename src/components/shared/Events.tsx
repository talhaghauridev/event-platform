import React from "react";

const Events = () => {
  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">
        Trust by <br /> Thousands of Events
      </h2>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        {/* <Search />
        <CategoryFilter /> */}
      </div>

      {/* <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={page}
        totalPages={events?.totalPages}
      /> */}
    </section>
  );
};

export default Events;