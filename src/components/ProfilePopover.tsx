import { useAuth } from "../context/AuthContext/AuthContext";

export default function ProfilePopover() {

  const { user, logoutAction } = useAuth();
  return (
    <div className="absolute right-0 top-12 w-86 rounded-2xl shadow-lg border border-slate-200 bg-white p-2">
      <div className="bg-primaryLight flex flex-col gap-3 items-center rounded-lg p-4 mb-2">
        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
          <span className="material-icons !text-5xl text-white">person</span>
        </div>
        <div className="flex flex-col gap-1 items-center text-slate-600">
          <p className="font-medium text-xl">{user ? user.first_name : "User"} {user ? user.last_name : ""}</p>
          <p className="">{user?.email}</p>
        </div>

    
      </div>
      <button className="cursor-pointer flex items-center gap-2 px-3 py-2 w-full rounded-md text-slate-700
        hover:bg-slate-100"
      >
        <span className="material-icons-outlined text-primary">visibility</span>
        <span>View profile</span>
      </button>
      <button 
        className="cursor-pointer flex items-center gap-2 px-3 py-2 w-full rounded-md text-slate-700
          hover:bg-slate-100"
        onClick={logoutAction}
      >
        <span className="material-icons text-primary">logout</span>
        <span>Log out</span>
      </button>

    </div>
  );
}