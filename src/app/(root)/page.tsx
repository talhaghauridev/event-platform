import Events from "@/components/shared/Events";
import Hero from "@/components/shared/Hero";
import { SearchParamProps } from "@/types";

const page = ({ searchParams }: SearchParamProps) => {
  return (
    <>
      <Hero />
      <Events searchParams={searchParams} />
    </>
  );
};

export default page;
