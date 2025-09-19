import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      
    ]
  },
  {
    path: "/register",
    Component: RegisterPage
  },
  {
    path: "/login",
    Component: LoginPage
  }
]);