import DesktopMenu from "@/components/layout/DesktopMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import NavMenu from "@/components/layout/NavMenu";
import { FC, ReactNode } from "react";
import SearchBar from "@/components/SearchBar";

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const MainLayout: FC<Props> = (props) => {
  return (
    <div>
      <MobileMenu />
      <DesktopMenu />
      <SearchBar />
      <div className="flex flex-1 flex-col md:pl-28">
        <NavMenu />
        <main className="flex-1 w-full">
          <div className="py-6 px-4 md:px-6">{props.children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
