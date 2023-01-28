import { setSidebarOpen } from "@/store/layoutSlice";
import { setSearchBarOpen } from "@/store/searchBar";
import { Menu } from "@headlessui/react";
import { FC } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";

const NavMenu: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="sticky top-0 z-10 h-16 flex-shrink-0 bg-jucr-primary shadow opacity-95 w-full items-center flex">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden"
        onClick={() => dispatch(setSidebarOpen(true))}
      >
        <span className="sr-only">Open sidebar</span>
        <HiOutlineMenuAlt3 className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="px-6 h-full w-full">
        {/* Profile dropdown */}
        <Menu
          as="div"
          className={"w-full h-full flex justify-center items-center"}
        >
          <Menu.Button
            className="block w-6/12 rounded-full bg-white border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onClick={() => dispatch(setSearchBarOpen(true))}
          >
            <span>Search in github...</span>
          </Menu.Button>
        </Menu>
      </div>
    </div>
  );
};

export default NavMenu;
