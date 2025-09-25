import { useContext, createContext } from "react";

interface LoginData {
  username: string;
  password: string;
}

interface AuthContextData {
  token: null | string;
  user: null | { [key: string]: string };
  loginAction: (loginData: LoginData) => any;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextData>({
  token: null,
  user: null,
  loginAction: () => {},
  logoutAction: () => {}
});

export default AuthContext;
export const useAuth = () => useContext(AuthContext);

