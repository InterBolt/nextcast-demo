"use client";

import dynamic from "next/dynamic";
import usePreloadedData from "../usePreloadedData";

const DynamicComponent = dynamic(() => import("./DynamicComponent"), {
  ssr: false,
});

const ClientComponent = () => {
  const data_A = usePreloadedData("data_A");

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-gray-600 border border-white rounded-xl">
      <h2 className="text-white text-center font-bold text-lg">src/components/ClientComponent</h2>
      <DynamicComponent />
      <div className="flex p-24 rounded-md bg-white text-gray-700 semibold text-center">{data_A}</div>
    </main>
  );
};

export default ClientComponent;
