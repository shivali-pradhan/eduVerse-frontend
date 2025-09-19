interface InputFieldProps {
  type: string;
  className: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconValue?: string;
  togglePwdVisibility? : {
    isVisible: boolean,
    onToggle: () => void
  };
  errorMessage: string
}

export default function InputField({
  type, 
  name, 
  className, 
  iconValue, 
  placeholder, 
  value, 
  onChange, 
  errorMessage,
  togglePwdVisibility
}: InputFieldProps) {
  
  const iconColor = "#4daab3";
  return (
    <>
    <div className="w-full min-w-[200px]">
      <div className="w-full relative">
        {iconValue ? <span className="material-icons absolute bottom-2.5" style={{color: iconColor}}>{iconValue}</span> : ""}
        <input
          type={type}
          name={name}
          value={value}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
        />
        {togglePwdVisibility ? 
          <button
            type="button"
            onClick={togglePwdVisibility.onToggle}
            className="cursor-pointer absolute right-2 bottom-1"
          >
            <span className="material-icons-outlined text-[#547792a4]">
              {togglePwdVisibility.isVisible ? "visibility" : "visibility_off"}
            </span>
          </button>
          : ""
        }
      </div>
      
      
      {errorMessage && <div className="mt-2 px-1 text-sm text-red-500 flex gap-1 items-center">
        <span className="material-icons-outlined !text-lg">error</span>
        <span>{errorMessage}</span>
      </div>}
    
    </div>
    
    </>
  )
}