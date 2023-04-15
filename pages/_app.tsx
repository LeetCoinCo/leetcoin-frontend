import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Layout } from "../components/base/Layout";
import { OnboardProvider } from "components/base/OnboardContext";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import supabaseClient from "../supabaseClient";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  // const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <React.Fragment>
      <Head>
        <title>Level Up Web3.</title>
        <meta name="title" content="LeetCore" />
        <meta name="description" content="Enter LeetCore." />
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
        {/* <OnboardProvider> */}
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionContextProvider>
        {/* </OnboardProvider> */}
      </React.Fragment>
    </React.Fragment>
  );
  // <Component {...pageProps} />
}
