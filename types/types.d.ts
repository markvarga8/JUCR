import { ReactElement, ReactNode } from "react";

import type { IconType } from "react-icons";

declare global {
  type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  interface IMenuItem {
    name: string;
    href: string;
    icon: IconType;
  }
}

export {};
