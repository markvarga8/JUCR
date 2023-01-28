import { setSidebarOpen } from "@/store/layoutSlice";
import { setSearchBarOpen } from "@/store/searchBar";
import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";
import { FC, Fragment } from "react";
import { FaUser } from "react-icons/fa";
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
          className={"w-full h-full flex justify-between items-center"}
        >
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search..."
              onClick={() => dispatch(setSearchBarOpen(true))}
            />
          </div>
          <Menu.Button className="text-white hover:text-black bg-jucr-primary rounded-full text-xs font-medium hover:bg-jucr-secondary">
            <span className="sr-only">Open user menu</span>
            <FaUser className="h-5 w-5" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={cn(
                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer",
                      {
                        "bg-gray-100": active,
                      }
                    )}
                  >
                    Profile
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default NavMenu;
