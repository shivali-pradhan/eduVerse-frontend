import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import { loginUser } from "../api/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const inputStyle = "w-full outline-none text-lg text-slate-600 pl-8 pr-2 py-1 bg-transparent border-b-2 border-[#54779256] transition duration-300 ease focus:border-primary";
  
  const auth = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({username: "", password: ""});
  const [loginError, setLoginError] = useState("");
  const [isPwdVisible, setPwdVisibility] = useState(false);

  function handlePwdVisibility() {
    setPwdVisibility((prev) => !prev);
  }

  function validateFields(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    if (!value.trim()) {
      setErrors({...errors, [name]: `${name[0].toUpperCase() + name.slice(1)} is required`});
    } else {
      setErrors({...errors, [name]: ""});
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    validateFields(e);
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = {username: "", password: ""};
    let isFormValid = true;

    if(!formData.username) {
      newErrors.username = "Username is required";
      setErrors((prev) => {
        return {...prev, username: newErrors.username}
      });
      isFormValid = false;
    }
    if(!formData.password) {
      newErrors.password = "Password is required";
      setErrors((prev) => {
        return {...prev, password: newErrors.password}
      });
      isFormValid = false;
    }

    if(isFormValid) {
      console.log("Register data:", formData);

      try {
        console.log("inside try block")
        auth.loginAction(formData);
      }
       catch(err) {
        console.log(err)
      }
      
    }
  }

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-[#b8f2f7] via-[#f3feff] to-[#9cd0d6] flex justify-center items-center">
        <div className="relative flex flex-col bg-white/80 shadow-md w-96 rounded-2xl my-6 px-3 py-4">
          <div className="relative m-2.5 items-center flex flex-col justify-center rounded-md text-slate-800">
            <div className="text-[#5abbcabd] w-20 h-20 rounded-full border-4 border-[#5abbcabd] flex items-center justify-center">
              <span className="material-icons !text-7xl my-2">person</span>
            </div>
            <h3 className="text-3xl font-bold text-primary my-4">
              Sign In
            </h3>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 p-6">
              <InputField 
                type="text"
                className={inputStyle}
                value={formData.username}
                name="username"
                iconValue="account_circle"
                placeholder="Username"
                onChange={handleInputChange}
                errorMessage={errors.username}
              />
              <InputField 
                type={isPwdVisible ? "text" : "password"} 
                className={inputStyle}
                value={formData.password}
                name="password"
                iconValue="lock"
                placeholder="Password"
                onChange={handleInputChange}
                togglePwdVisibility={{isVisible: isPwdVisible, onToggle: handlePwdVisibility}}
                errorMessage={errors.password}
              />

              
            </div>
            {loginError && <div className="px-6 text-red-500 flex gap-1 items-center justify-center">
              <span className="material-icons-outlined !text-lg">error</span>
              <span>{loginError}</span>
            </div>}
            


            <div className="p-6 pt-6">
              
              <button 
                type="submit"
                className="w-full py-2 px-4 cursor-pointer rounded-lg bg-primary text-center font-medium text-white transition-all shadow-md 
                  hover:shadow-lg active:bg-primary hover:bg-primary/90 active:shadow-none 
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                
              >
                Sign In
              </button>
              <p className="flex justify-center mt-6 text-sm text-slate-600">
                Don&apos;t have an account?
                <button 
                  onClick={() => navigate("/register")} 
                  className="cursor-pointer ml-1 font-semibold text-primary"
                >
                  Create one
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      
    </>
  )
}