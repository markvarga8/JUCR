import {
  FaHome,
  FaGithub,
  FaUsers,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

const menuItems: Array<IMenuItem> = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Repositories", href: "/repositories", icon: FaGithub },
  { name: "Users", href: "/users", icon: FaUsers },
  { name: "Issues", href: "/issues", icon: FaTasks },
  { name: "Discussions", href: "/discussions", icon: FaChartLine },
];

export default menuItems;
