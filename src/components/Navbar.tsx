import { NavLink, Link } from "react-router";
import { useState } from "react";

import Sidebar from "./Sidebar";

export default function Navbar() {

  const linkStyle = "py-3 px-1 text-lg font-medium"
  const activeLinkStyle = "border-b-3 border-primary text-primary " + linkStyle;
  const nonActiveLinkStyle = "hover:border-b-2 border-slate-300 text-slate-500 " + linkStyle;

  const navbarLinks = [
    {
      name: "home",
      route: "/",
      text: "Home",
      icon: "home"
    },
    {
      name: "courses",
      route: "/courses",
      text: "My Courses",
      icon: "school"
    },
    {
      name: "quizzes",
      route: "/quizzes",
      text: "My Quizzes",
      icon: "quiz"
    },
  ];

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  function handleMenuClick() {
    setIsSideMenuOpen(prev => !prev);
  }

  return (
    <>
    <nav className="block w-full bg-gray-50 shadow-md">
      <div className="container flex items-center justify-between mx-auto text-gray-500">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="cursor-pointer h-12 w-12 rounded-full hover:bg-primaryLight flex items-center justify-center"
            onClick={handleMenuClick}
          >
            <span className="material-icons !text-2xl text-primary">menu</span>
          </button>
          <div className="">
            <Link to="/"
              className="block cursor-pointer text-2xl text-primary font-semibold">
              eduVerse
            </Link>
          </div>
        </div>
        
        
        
        <div className="hidden lg:block">
          <ul className="flex justify-between items-center md:gap-6 lg:gap-8">
            {
              navbarLinks.map(link => 
              <NavLink 
                key={link.route}
                to={link.route} 
                className={({isActive}) => isActive ? activeLinkStyle : nonActiveLinkStyle}>
                {link.text}
              </NavLink>)
            }        
          </ul>
        </div>

      </div>

    </nav>
    
    <aside className={`absolute top-14 left-0 h-screen w-74 bg-gray-50 shadow-lg p-4 flex flex-col transform duration-300
      ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      <Sidebar links={navbarLinks} />
    </aside>
    
    </>


  )
}