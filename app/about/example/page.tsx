import ServerComponent from "../../../src/components/ServerComponent";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-center text-white text-3xl">/ABOUT/EXAMPLE</h1>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/about">ABOUT</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/about/example">ABOUT/EXAMPLE</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/about/other">ABOUT/OTHER</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/sales">SALES</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/">HOME</Link>
      <ServerComponent />
    </main>
  );
}
