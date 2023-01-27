import { ReactElement, ReactNode } from "react";

declare global {
  type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

export {};
