import MenuItem from "@/components/layout/MenuItem";
import menuItems from "@/configs/menuItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import logo from "@/public/images/car-svgrepo-com.svg";

const DesktopMenu: FC = () => {
  const router = useRouter();

  return (
    <div className="hidden overflow-y-auto md:fixed w-28 h-full bg-jucr-primary md:block opacity-95">
      <div className="flex w-full h-full flex-col items-center">
        <div className="flex flex-shrink-0 items-center h-16">
          <Link href="/" className="flex flex-wrap justify-center px-4 gap-3">
            <Image src={logo} alt="logo" width="100" height="100" />
          </Link>
        </div>
        <div className="w-full h-full px-2 flex-1 items-center md-rounded">
          {menuItems.map((menuItem, i) => (
            <MenuItem
              key={i}
              active={router.pathname === menuItem.href}
              href={menuItem.href}
              icon={menuItem.icon}
            >
              <span className="mt-2 text-[10px]">{menuItem.name}</span>
            </MenuItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
