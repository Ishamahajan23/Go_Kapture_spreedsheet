import Head from "next/head";
import Spreadsheet from "./components/Spreadsheet";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Go-Kap Sheets</title>
        <meta
          name="description"
          content="A spreadsheet app built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex  flex-col items-center justify-center min-h-screen py-2">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Go-Kap Sheets</h1>
        </div>
        <Spreadsheet />
      </main>
    </div>
  );
}
