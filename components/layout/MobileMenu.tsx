import MenuItem from "@/components/layout/MenuItem";
import menuItems from "@/configs/menuItems";
import { RootState } from "@/store";
import { setSidebarOpen } from "@/store/layoutSlice";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import logo from "@/public/images/car.svg";
import Image from "next/image";

const MobileMenu: FC = () => {
  const router = useRouter();

  const sidebarOpen = useSelector(
    (state: RootState) => state.layout.sidebarOpen
  );
  const dispatch = useDispatch();

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={() => dispatch(setSidebarOpen(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-85" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full flex-1 flex-col bg-white pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => dispatch(setSidebarOpen(false))}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <HiX className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <Link
                href="/"
                className="flex flex-shrink-0 items-center px-4 gap-4"
              >
                <Image src={logo} alt="logo" width="100" height="100" />
                <span className="font-bold">{`${process.env.NEXT_PUBLIC_APP_NAME}`}</span>
              </Link>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {menuItems.map((menuItem, i) => (
                    <MenuItem
                      key={i}
                      active={router.pathname.includes(menuItem.href)}
                      href={menuItem.href}
                      icon={menuItem.icon}
                      mobile
                    >
                      {menuItem.name}
                    </MenuItem>
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
