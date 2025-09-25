import { useAuth } from "../context/AuthContext/AuthContext";

export default function HomePage() {

  const auth = useAuth();

  return (
    <>
      <h1>Home</h1>

      <h3>Hi, {auth.user ? auth.user.first_name : "User" }</h3>
    </>
  )
}