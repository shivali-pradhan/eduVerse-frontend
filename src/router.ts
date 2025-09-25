import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AllCourses from "./pages/Course/AllCoursesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "login",
        Component: LoginPage
      },
      {
        path: "register",
        Component: RegisterPage
      },    
      {
        path: "courses",
        Component: AllCourses
      } 
    ]
  },
  
]);