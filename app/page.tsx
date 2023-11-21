import ServerComponent from "@/src/components/ServerComponent";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black w-full flex flex-col justify-center items-center">
      <h1>/HOME</h1>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/about">ABOUT</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/about/example">ABOUT/EXAMPLE</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/about/other">ABOUT/OTHER</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/sales">SALES</Link>
      <Link className="text-gray-200 font-semibold p-4 bg-gray-700 mb-4 rounded" href="/">HOME</Link>
      <ServerComponent />
    </main>
  );
}
