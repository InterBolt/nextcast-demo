"use client";

import usePreloadedData from "../usePreloadedData";
import NestedComponent from "./NestedComponent";

const DynamicComponent = () => {
  // 💡 comment out this line and uncomment the below lines to see the NextCast error
  const data_A = usePreloadedData("data_A");

  // 💡 uncomment these line to see the NextCast error
  // const dataField = 'data_A'
  // const data_A = usePreloadedData(dataField);

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-gray-600 border border-white rounded-xl">
      <h2 className="text-white text-center font-bold text-lg">src/components/DynamicComponent</h2>
      <NestedComponent />
      <div className="flex p-24 rounded-md bg-white text-gray-700 semibold text-center">{data_A}</div>
    </main>
  );
};

export default DynamicComponent;
