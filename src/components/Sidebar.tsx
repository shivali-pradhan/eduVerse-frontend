import { NavLink, Link } from "react-router";

interface Link {
  name: string;
  route: string;
  text: string;
  icon: string;
  
}
interface SidebarProps {
  links: Array<Link>
}

export default function Sidebar({links}: SidebarProps) {
  const sideBarLinkStyle = "flex items-center gap-2 px-3 py-1 transition-colors hover:bg-slate-100 rounded-md";
  const sideBarActiveLinkStyle = "border-l-4 border-primary text-primary font-medium bg-primaryLight " + sideBarLinkStyle;
  const sideBarInactiveLinkStyle = "text-slate-500  " + sideBarLinkStyle;

  return (
    <>
      <h1 className="text-xl font-semibold mb-6 px-2">eduVerse</h1>
      <nav className="flex flex-col gap-2">
        {links.map(({ route, text, icon }) => (
          <NavLink
            key={route}
            to={route}
            className={({ isActive }) => isActive ? sideBarActiveLinkStyle : sideBarInactiveLinkStyle}
          >
            <span className="material-icons !text-2xl">{icon}</span>
            <span className="text-lg">{text}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
