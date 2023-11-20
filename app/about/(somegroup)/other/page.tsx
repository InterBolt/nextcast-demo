import ClientComponent from "../../../../src/components/ClientComponent";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>/ABOUT/OTHER</h1>
      <ClientComponent />
      <Link href="/about">Go to /ABOUT</Link>
      <Link href="/about/example">Go to /ABOUT/EXAMPLE</Link>
      <Link href="/about/other">Go to /ABOUT/OTHER</Link>
      <Link href="/">Go to /HOME</Link>
    </main>
  );
}
