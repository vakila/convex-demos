import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { useAuth0 } from "@auth0/auth0-react";
import convexConfig from "../convex.json";
import clientConfig from "../convex/_generated/clientConfig";

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConvexProviderWithAuth0
      client={convex}
      authInfo={authInfo}
      loading={<Loading />}
      loggedOut={<Login />}
    >
      <Component {...pageProps} />
    </ConvexProviderWithAuth0>
  );
}

function Loading() {
  return (
    <div className={styles.loadingLayout}>
      <div className={styles.loading} />
    </div>
  );
}

function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js with Convex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> with{" "}
          <a href="https://convex.dev">Convex</a>
        </h1>

        <button className={styles.button} onClick={loginWithRedirect}>
          Log in
        </button>
      </main>
    </div>
  );
}
