import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Table from "../components/questions/Table";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>LeetCoin</title>
        <meta
          name="description"
          content="Level up your Web3 skills with LeetCoin"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table
        // colHeaders={["h1", "h2", "h3"]}
        relativeLink={`/questions/`}
        rowData={[1]}
      ></Table>
    </>
  );
}
