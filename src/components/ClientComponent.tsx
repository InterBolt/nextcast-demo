"use client";

import dynamic from "next/dynamic";
import usePreloadedData from "../usePreloadedData";

const DynamicComponent = dynamic(() => import("./DynamicComponent"), {
  ssr: false,
});

const ClientComponent = () => {
  const data_A = usePreloadedData("data_A");

  return (
    <main className="flex flex-col items-center justify-between w-full min-h-screen p-24">
      <DynamicComponent />
      {data_A}
    </main>
  );
};

export default ClientComponent;
