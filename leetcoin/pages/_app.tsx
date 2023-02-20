import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/base/Layout";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Level Up Web3.</title>
        <meta name="title" content="LeetCoin" />
        <meta name="description" content="Enter LeetCode." />
        <meta
          name="keywords"
          content="leetcode, leetcode for web3, leetcode for crypto, learn blockchain programming, blockchain, crypto, nft music video, ethereum"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="msapplication-TileColor" content="#da532c" />
      </Head>

      <React.Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    </React.Fragment>
  );
  // <Component {...pageProps} />
}
