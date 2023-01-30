import cn from "classnames";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import { setSidebarOpen } from "@/store/layoutSlice";
import { useDispatch } from "react-redux";

interface OwnProps {
  active: boolean;
  children: ReactNode;
  href: string;
  icon: IconType;
  mobile?: boolean;
}

type Props = OwnProps;

const MenuItem: FC<Props> = (props) => {
  const dispatch = useDispatch();

  if (props.mobile) {
    return (
      <Link
        href={props.href}
        onClick={() => dispatch(setSidebarOpen(false))}
        className={cn("group flex items-center px-2 py-2 font-medium rounded-md", {
          "bg-gray-100 text-gray-900": props.active,
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !props.active,
          "text-base": props.mobile,
          "text-sm": !props.mobile,
        })}
      >
        <props.icon
          className={cn("flex-shrink-0 h-6 w-6", {
            "text-jucr-primary": props.active,
            "text-gray-400 group-hover:text-gray-500": !props.active,
            "mr-4": props.mobile,
            "mr-3": !props.mobile,
          })}
          aria-hidden="true"
        />
        {props.children}
      </Link>
    );
  }

  return (
    <Link
      href={props.href}
      className={cn(
        "group w-full p-6 rounded-md flex flex-col items-center text-xs font-medium text-white hover:shadow-menu hover:translate-y-1 transition-all duration-200",
        {
          "shadow-menu-lg": props.active,
        },
      )}
      aria-current={props.active ? "page" : undefined}
    >
      <props.icon className="h-6 w-6" aria-hidden="true" />
      {props.children}
    </Link>
  );
};

export default MenuItem;
