import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";

export default function RootLayout() {

  

  return (
    <><AuthProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
     
      <footer>
        <div className="h-60 w-full bg-gray-300">Footer</div>
      </footer>
      </AuthProvider>
    </>
  )
}