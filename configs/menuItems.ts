import {
  FaHome,
  FaFolder,
  FaCalendar,
  FaInbox,
  FaChartBar,
  FaGithub,
  FaUsers,
} from "react-icons/fa";

const menuItems: Array<IMenuItem> = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Repositories", href: "/repositories", icon: FaGithub },
  { name: "Users", href: "/users", icon: FaUsers },
  { name: "Projects", href: "/projects", icon: FaInbox },
];

export default menuItems;
