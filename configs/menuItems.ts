import {
  FaHome,
  FaFolder,
  FaCalendar,
  FaInbox,
  FaChartBar,
} from "react-icons/fa";

const menuItems: Array<IMenuItem> = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Projects", href: "/projects", icon: FaFolder },
  { name: "Calendar", href: "/calendar", icon: FaCalendar },
  { name: "Documents", href: "/documents", icon: FaInbox },
  { name: "Reports", href: "/reports", icon: FaChartBar },
];

export default menuItems;
