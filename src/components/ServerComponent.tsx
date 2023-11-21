import NestedComponent from "./NestedComponent";

const ServerComponent = () => {
  return (
    <main className="flex flex-col items-center justify-between p-8 border border-solid bg-gray-600 border-white rounded-xl">
      <h2 className="text-white text-center font-bold text-lg">src/components/ServerComponent</h2>
      <NestedComponent />
    </main>
  );
};

export default ServerComponent;
