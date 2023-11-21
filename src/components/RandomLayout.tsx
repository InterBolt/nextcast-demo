"use client";

import usePreloadedData from "../usePreloadedData";

const RandomLayout = () => {
  const data_C = usePreloadedData("data_C");

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-gray-600 border border-white rounded-xl">
      <h2 className="text-white text-center font-bold text-lg">src/components/RandomLayout</h2>
      <div className="flex p-24 rounded-md bg-white text-gray-700 semibold text-center">{data_C}</div>
    </main>
  );
};

export default RandomLayout;
