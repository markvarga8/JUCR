import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";
import Head from "next/head";
import dynamic from "next/dynamic";

type AppPropsWithLayout = AppProps<{}> & {
  Component: NextPageWithLayout;
};
const MyApp = ({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>{getLayout(<Component {...pageProps} />)}</ReduxProvider>
      </ApolloProvider>
    </>
  );
};

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
