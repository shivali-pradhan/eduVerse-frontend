import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <>
      <header>
        <nav className="h-16 w-full bg-gray-200">Navbar</nav>
      </header>
      <Outlet />
      <footer>
        <div className="h-60 w-full bg-gray-300">Footer</div>
      </footer>
    </>
  )
}