"use client";

import usePreloadedData from "../usePreloadedData";

const NestedComponent = () => {
  const data_B = usePreloadedData("data_B");

  return (
    <main className="p-8 font-semibold text-white bg-gray-600 rounded-lg">
      <p>A nested component</p>
      {data_B}
    </main>
  );
};

export default NestedComponent;
