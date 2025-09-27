import { NavLink, Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext/AuthContext";
import Sidebar from "./Sidebar";
import ProfilePopover from "./ProfilePopover";

export default function Navbar() {

  const linkStyle = "py-3 px-1 text-lg font-medium"
  const activeLinkStyle = "border-b-3 border-primary text-primary font-semibold " + linkStyle;
  const nonActiveLinkStyle = "hover:text-primary text-slate-500 " + linkStyle;

  const navigate = useNavigate();

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

  const unauthenticatedLinks = [
    {
      name: "home",
      route: "/",
      text: "Home",
      icon: "home"
    },
    {
      name: "courses",
      route: "/courses",
      text: "Courses",
      icon: "school"
    },
    
  ]
  const auth = useAuth();
  console.log(auth)

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);

  function handleMenuClick() {
    setIsSideMenuOpen(prev => !prev);
  }
  function handleProfileClick() {
    setIsProfilePopoverOpen(prev => !prev)
  }

  return (
    <>
    <nav className="block w-full bg-gray-50 shadow-sm relative z-100">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex lg:hidden cursor-pointer h-12 w-12 rounded-full hover:bg-primaryLight items-center justify-center"
            onClick={handleMenuClick}
          >
            <span className="material-icons !text-2xl text-primary">menu</span>
          </button>
          <div className="">
            <Link to="/"
              className="block cursor-pointer text-2xl text-primary font-bold font-mono">
              eduVerse
            </Link>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center justify-center">
          <ul className="flex justify-between items-center md:gap-6 lg:gap-8">
            { 
              auth.user 
              ? 
                navbarLinks.map(link => 
                <NavLink 
                  key={link.route}
                  to={link.route} 
                  className={({isActive}) => isActive ? activeLinkStyle : nonActiveLinkStyle}>
                  {link.text}
                </NavLink>)
              :
                unauthenticatedLinks.map(link => 
                <NavLink 
                  key={link.route}
                  to={link.route} 
                  className={({isActive}) => isActive ? activeLinkStyle : nonActiveLinkStyle}>
                  {link.text}
                </NavLink>)
            }        
          </ul>
          
          <div className={`relative ${auth.user ? 'block' : 'hidden' }`}>
            <button
              className="ml-7 h-10 w-10 rounded-full bg-primary/90 hover:bg-primary cursor-pointer  flex items-center justify-center"
              onClick={handleProfileClick}
            >
              <span className="material-icons text-white">person</span>
            </button>
            <div className={`${isProfilePopoverOpen ? 'block' : 'hidden'}`}>
              <ProfilePopover />
            </div>
          </div>

          <div className={`${auth.user ? 'hidden' : 'block'} flex items-center gap-3 ml-6`}>
            <button
              className="px-4 py-2 border-1 border-primary rounded-md font-semibold  text-primary cursor-pointer
                hover:bg-primaryLight hover:text-primary"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
            <button
              className="px-4 py-2 bg-primary rounded-md font-semibold  text-slate-100 cursor-pointer
                hover:bg-primary/80"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>

        </div>

      </div>

    </nav>
    
    <aside className={`absolute top-13 z-1000 left-0 h-screen w-74 bg-gray-50 shadow-lg p-4 flex flex-col transform duration-300
      ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      <Sidebar links={navbarLinks} />
    </aside>
    
    </>


  )
}