"use client";

import usePreloadedData from "../usePreloadedData";

const NestedComponent = () => {
  const data_B = usePreloadedData("data_B");

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-gray-600 border border-white rounded-xl">
      <h2 className="text-white text-center font-bold text-lg">src/components/NestedComponent</h2>
      <div className="flex p-24 rounded-md bg-white text-gray-700 semibold text-center">{data_B}</div>
    </main>
  );
};

export default NestedComponent;
