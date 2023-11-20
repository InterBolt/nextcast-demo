import ClientComponent from "./ClientComponent";

const ServerComponent = () => {
  return (
    <main className="flex flex-col items-center justify-between w-full min-h-screen p-24">
      <ClientComponent />
    </main>
  );
};

export default ServerComponent;
