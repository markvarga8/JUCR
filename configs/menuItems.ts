import {
  FaHome,
  FaUsers,
  FaFolder,
  FaCalendar,
  FaInbox,
  FaChartBar,
} from "react-icons/fa";

const menuItems: Array<IMenuItem> = [
  { name: "Dashboard", href: "/", icon: FaHome },
  { name: "Projects", href: "/projects", icon: FaFolder },
  { name: "Calendar", href: "/calendar", icon: FaCalendar },
  { name: "Documents", href: "/documents", icon: FaInbox },
  { name: "Reports", href: "/reports", icon: FaChartBar },
];

export default menuItems;
