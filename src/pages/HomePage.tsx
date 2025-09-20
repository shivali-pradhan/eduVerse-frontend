import { useAuth } from "../context/AuthContext";

export default function HomePage() {

  const auth = useAuth();
  // const [user, setUser] = useState({
  //   firstName: "",

  // });

  // if (auth.user) {
  //   setUser(auth.user);
  // }
  return (
    <>
      <h1>Home</h1>

      <h3>Hi, {auth.user ? auth.user.firstName : "User" }</h3>
    </>
  )
}