import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode
}

interface LoginData {
  username: string;
  password: string;
}

export default function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);

  const navigate = useNavigate();

  const fetchCurrentUser = async (access_token: string | null) => {

    if(access_token) {
      try {
        const response = await fetch('http://localhost:8000/users/current', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        const data = await response.json();
        console.log("Response from current user endpoint: ", data);
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem("access_token");
          navigate("/");
        }
      } 
      catch(err) {
        console.log(err);
      }  
    }
    else {
      setToken(null);
      setUser(null);
    }
  };
  
  useEffect(() => {
    fetchCurrentUser(token);
  }, []);

  const loginAction = async (loginData: LoginData) => {

    const formData = new URLSearchParams();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      const data = await response.json();
      console.log("Response from login endpoint", data);

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        fetchCurrentUser(data.access_token);
        navigate("/");
      }
      else if (data.detail) return {error: data.detail};
      else return {error: "Could not login. Please try again!"};
    }
    catch(err) {
      console.log("Login failed");
      console.log(err);
    } 
  }

  const logoutAction = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={ {token, user, loginAction, logoutAction} }>
      {children}
    </AuthContext.Provider>
  );

}