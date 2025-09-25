// import AuthProvider from "./context/AuthContext/AuthProvider";
import { RouterProvider } from 'react-router'
import { router } from './router.ts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}