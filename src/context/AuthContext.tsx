import { useContext, useState, createContext, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface LoginData {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  user: null | { [key: string]: string};
  loginAction: (loginData: LoginData) => any;
  logoutAction: () => void;
}



interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({
  token: "",
  user: {},
  loginAction: () => {},
  logoutAction: () => {}
});

export default function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");

  const navigate = useNavigate();

  
  
  const loginAction = async (loginData: LoginData) => {
    const formData = new URLSearchParams();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);

    console.log("in login action")
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      const data = await response.json();

      if (data.token && data.user) {

        console.log(data);

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("access_token", data.token);
        navigate("/");
      }
      throw new Error(data.detail);
    }
    catch(err) {
      console.log(err);
    } 
  }

  const logoutAction = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={ {token, user, loginAction, logoutAction} }>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => {
  return useContext(AuthContext);
};

