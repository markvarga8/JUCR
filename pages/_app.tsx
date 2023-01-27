import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import type { AppProps } from "next/app";

type AppPropsWithLayout = AppProps<{}> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <ApolloProvider client={client}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
};

export default MyApp;
