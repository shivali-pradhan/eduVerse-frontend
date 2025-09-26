import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/register";
import { validatePassword, validateEmail, validateUsername } from "../utils/validations";
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const navigate = useNavigate();

  const nonFocusInputColor = '#54779256'
  const labelStyle = `absolute left-4 -top-3.5 z-10 bg-white px-1 text-primary transition-all text-lg font-medium
                      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-400
                      peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-lg`;
  const labelledInputStyle = `peer block w-full text-lg text-slate-600 border-2 border-[${nonFocusInputColor}] rounded-lg px-4 pb-2 pt-4 
                              focus:outline-none focus:border-none focus:ring-2 focus:ring-primary`

  const validationErrorStyle = "mt-1 px-1 text-sm text-red-500 flex gap-1 items-center";

  const [errorMessage, setErrorMessage] = useState("");

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: string;
  }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "STUDENT"
  });
  const [errors, setErrors] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    username: "", 
    password: ""
  });
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  
  function clearErrors(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    if (value.trim()) {
      setErrors(prev => {
        return {...prev, [name]: ""}
      });
    } 
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearErrors(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "password") {
      setErrors(prev => {
        return {...prev, password: validatePassword(e.target.value)?.error || ""};
      });
      if (!e.target.value.trim()) {
        setErrors(prev => {
          return {...prev, password: ""}
        });
      }
    }
  }
  function handleRoleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({...formData, [e.target.name]: e.target.value.toUpperCase() });
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
        if (fieldName === "lastName") continue;
        isFormValid = false;
        if (fieldName === "firstName") {
          setErrors(prev => {
            return {...prev, [fieldName]: `First name is required`}
          });
        } else {
          setErrors(prev => {
            return {...prev, [fieldName]: `${fieldName[0].toUpperCase() + fieldName.slice(1)} is required`}
          });
        }
        
      }
    }

    if (validatePassword(formData.password)) {
      isFormValid = false;
      setErrors(prev => {
        return {...prev, password: validatePassword(formData.password)!.error}
      });
     
    }
    if (validateEmail(formData.email)) {
      isFormValid = false;
      setErrors(prev => {
        return {...prev, email: validateEmail(formData.email)!.error}
      });
      
    }
    if (validateUsername(formData.username)) {
      isFormValid = false;
      setErrors(prev => {
        return {...prev, username: validateUsername(formData.username)!.error}
      });
    }

    if (isFormValid) {
      console.log("Register data:", formData);
      const response = await registerUser(formData);
      if (response?.newUser) {
        toast.success("Registration Successful. Please login to continue");
        navigate("/login");

      } else if (response?.error) {
        setErrorMessage(response.error);
      }
    }
  }

  return (
    <div className="py-4 bg-gradient-to-br from-[#B8F2F7] via-[#F3FEFF] to-[#9CD0D6] flex justify-center items-center">
     
      <div className="relative flex flex-col bg-white/90 shadow-lg w-full max-w-sm sm:max-w-lg md:max-w-xl rounded-3xl my-6 px-0 sm:px-1 py-4">
        <div className="relative m-2.5 items-center flex flex-col justify-center rounded-md text-slate-800">
          <span className="material-icons-outlined !text-7xl text-[#5abbcabd] my-2">
            person_add
          </span>
          <h3 className="text-3xl font-bold text-primary my-2">Create Account</h3>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
              <div>
                <div className="relative flex-1">
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
                    First Name*
                  </label>
                </div>
                { errors.firstName && <div className={validationErrorStyle}>
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
                  Email Address*
                </label>
              </div>
              { errors.email && <div className={validationErrorStyle}>
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
                  Username*
                </label>
              </div>
              { errors.username && <div className={validationErrorStyle}>
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
                  Password*
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
              { errors.password && <div className={validationErrorStyle}>
                <span className="material-icons-outlined !text-lg">error</span>
                <span>{errors.password}</span>
              </div>}
            </div>


            <div className="px-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-lg font-semibold text-slate-500 mr-3">Select your role:</p>
              {/* Student */}
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  defaultChecked
                  className="hidden peer"
                  onChange={handleRoleChange}
                />
                <span className="h-5 w-5 mr-2 flex items-center justify-center rounded-full border-2 border-gray-400 peer-checked:border-primary"> </span>
                <span className="absolute left-1 hidden h-3 w-3 rounded-full bg-primary peer-checked:block"></span>
                <span className="text-slate-600 peer-checked:text-primary peer-checked:font-medium">Student</span>
              </label>
              {/* Instructor */}
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  className="hidden peer"
                  onChange={handleRoleChange}
                />
                <span className="h-5 w-5 mr-2 flex items-center justify-center rounded-full border-2 border-gray-400 peer-checked:border-primary"> </span>
                <span className="absolute left-1 hidden h-3 w-3 rounded-full bg-primary peer-checked:block"></span>
                <span className="text-slate-600 peer-checked:text-primary peer-checked:font-medium">Instructor</span>
              </label>
            </div>

            {errorMessage && <div className="border-1 border-red-600 bg-red-100 px-3 py-2 rounded-xl">
              <div className={validationErrorStyle}>
                <span className="material-icons-outlined !text-lg">error</span>
                <span className="text-base">{errorMessage}</span>
              </div>
            </div>}
          </div>
          {/* Submit */}
          <div className="p-6 pt-6">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-primary py-2.5 px-4 text-center font-medium text-white transition-all shadow-md 
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
