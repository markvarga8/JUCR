import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

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
      <ReduxProvider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default MyApp;
