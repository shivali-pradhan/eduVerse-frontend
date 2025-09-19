import { useState } from "react";
import { useNavigate } from "react-router";
import { registerStudent } from "../api/register";

export default function RegisterPage() {
  const navigate = useNavigate();
  const nonFocusInputColor = '#54779256'
  const labelStyle = `absolute left-4 -top-3.5 z-10 bg-white px-1 text-primary transition-all text-lg font-medium
                      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-400
                      peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-lg`;
  const labelledInputStyle = `peer block w-full text-lg text-slate-600 border-2 border-[${nonFocusInputColor}] rounded-lg px-4 pb-2 pt-4 
                              focus:outline-none focus:border-none focus:ring-2 focus:ring-primary`
                
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({firstName: "", lastName: "", email: "", username: "", password: ""});
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  
  function clearErrors(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    if (value.trim()) {
      setErrors(prev => {
        return {...prev, [name]: ""}
      });
    } 
  }
  
  function validatePassword(password: string) {
    if (password.length < 8) {
      setErrors(prev => {
        return {...prev, password: "Password must be at least 8 characters long"}
      });
    } else if (!/[A-Z]/.test(password)) {
      setErrors(prev => {
        return {...prev, password: "Password must include an uppercase letter"}
      });
    } else if (!/[a-z]/.test(password)) {
      setErrors(prev => {
        return {...prev, password: "Password must include an lowercase letter"}
      });
    } else if (!/[0-9]/.test(password)) {
      setErrors(prev => {
        return {...prev, password: "Password must include a digit"}
      });
    } else if (!/[!@#$%^&*()]/.test(password)) {
      setErrors(prev => {
        return {...prev, password: "Password must include a special character"}
      });
    } else if (/\s/.test(password)) {
      setErrors(prev => {
        return {...prev, password: "Password cannot contain spaces"}
      });
    } else {
      setErrors(prev => {
        return {...prev, password: ""}
      });
      return true
    }
  }

  function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("in validate email")
    if (!regex.test(email)) {
      console.log("invalid email")
      setErrors(prev => {
        return {...prev, email: "Not a valid email address"}
      });
    } else return true
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearErrors(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "password") {
      validatePassword(e.target.value);
      if (!e.target.value.trim()) {
        setErrors(prev => {
          return {...prev, password: ""}
        });
      }
    }
  }

  function handlePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let isFormValid = true;

    for (let field in formData) {
      const fieldName = field as keyof FormData;
      
      if (!formData[fieldName].trim()) {
        if (fieldName === "firstName") {
          setErrors(prev => {
            return {...prev, [fieldName]: `First name is required`}
          });
        } else if (fieldName !== "lastName") {
          setErrors(prev => {
            return {...prev, [fieldName]: `${fieldName[0].toUpperCase() + fieldName.slice(1)} is required`}
          });
        }
        isFormValid = false;
      }
    }
    if ((validatePassword(formData.password) !== true)) isFormValid = false;
    if ((validateEmail(formData.email) !== true)) isFormValid = false;
    if (isFormValid) {
      console.log("Register data:", formData);
      const response = await registerStudent(formData);
      console.log("Response", response);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#B8F2F7] via-[#F3FEFF] to-[#9CD0D6] flex justify-center items-center">
      <div className="relative flex flex-col bg-white/80 shadow-lg w-full max-w-sm sm:max-w-lg md:max-w-xl rounded-3xl my-6 px-2.5 sm:px-5 py-4">
        <div className="relative m-2.5 items-center flex flex-col justify-center rounded-md text-slate-800">
          <span className="material-icons-outlined !text-7xl text-[#5abbcabd] my-2">
            person_add
          </span>
          <h3 className="text-3xl font-bold text-primary my-2">Create Account</h3>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    className={labelledInputStyle}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <label htmlFor="firstName" className={labelStyle}>
                    First Name
                  </label>
                </div>
                { errors.firstName && <div className="mt-2 px-1 text-sm text-red-500 flex gap-1 items-center">
                  <span className="material-icons-outlined !text-lg">error</span>
                  <span>{errors.firstName}</span>
                </div>}
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  className={labelledInputStyle}
                  onChange={handleChange}
                  placeholder=""
                />
                <label htmlFor="lastName" className={labelStyle}>
                  Last Name
                </label>
              </div>
              
              
            </div>
            
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className={labelledInputStyle}
                  onChange={handleChange}
                  placeholder=""
                />
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
              </div>
              { errors.email && <div className="mt-2 px-1 text-sm text-red-500 flex gap-1 items-center">
                <span className="material-icons-outlined !text-lg">error</span>
                <span>{errors.email}</span>
              </div>}
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  className={labelledInputStyle}
                  onChange={handleChange}
                  placeholder=""
                />
                <label htmlFor="username" className={labelStyle}>
                  Username
                </label>
              </div>
              { errors.username && <div className="mt-2 px-1 text-sm text-red-500 flex gap-1 items-center">
                <span className="material-icons-outlined !text-lg">error</span>
                <span>{errors.username}</span>
              </div>}
            </div>

            <div>
              <div className="relative">
                
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  className={labelledInputStyle}
                  onChange={handleChange}
                  placeholder=""
                />
                <label htmlFor="password" className={labelStyle}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="cursor-pointer absolute right-4 bottom-2"
                >
                  <span className="material-icons-outlined text-slate-500">
                    {isPasswordVisible ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
              { errors.password && <div className="mt-2 px-1 text-sm text-red-500 flex gap-1 items-center">
                <span className="material-icons-outlined !text-lg">error</span>
                <span>{errors.password}</span>
              </div>}
            </div>
           
            
          </div>
          {/* Submit */}
          <div className="p-6 pt-6">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-primary py-2 px-4 text-center font-medium text-white transition-all shadow-md 
              hover:shadow-lg active:bg-primary hover:bg-primary/90 active:shadow-none 
              disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Register
            </button>
            <p className="flex justify-center mt-3 text-sm text-slate-600">
              Already have an account?
              <button onClick={() => navigate("/login")} className="cursor-pointer ml-1 font-semibold text-primary">
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
