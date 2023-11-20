"use client";

import usePreloadedData from "../usePreloadedData";

const DynamicComponent = () => {
  // 💡 comment out this line and uncomment the below lines to see the NextCast error
  const data_A = usePreloadedData("data_A");

  // 💡 uncomment these line to see the NextCast error
  // const dataField = 'data_A'
  // const data_A = usePreloadedData(dataField);

  return (
    <main className="flex flex-col items-center justify-between w-full min-h-screen p-24">
      {data_A}
    </main>
  );
};

export default DynamicComponent;
