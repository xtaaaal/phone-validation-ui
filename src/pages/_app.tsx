import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import Layout from "@/components/structures/layout";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppWrapper } from "@/context/AppContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppWrapper>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppWrapper>
  );
};

export default MyApp;
