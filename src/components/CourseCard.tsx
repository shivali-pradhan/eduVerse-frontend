import { useNavigate } from "react-router";
import { Link } from "react-router";

interface CourseCardProps {
  courseID: number;
  imageUrl?: string;
  title: string;
  description: string;
  duration: number;
  instructorName: string;
  onView?: () => void;
  onEnroll?: () => void;
  className?: string;
};

export default function CourseCard({
  courseID,
  imageUrl,
  title,
  description,
  duration,
  instructorName,
  onView,
  onEnroll,
  className = "",
}: CourseCardProps) {

  const navigate = useNavigate();
  return (
    <article
      className={`cursor-pointer max-w-sm bg-white hover:bg-gray-50 border-1 border-gray-200 rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col ${className}`}
      aria-label={`Course card: ${title}`}
      onClick={() => navigate(`/courses/${courseID}`)}
    >
      {/* Image */}
      <div className="h-44 w-full shrink-0 overflow-hidden bg-zinc-100">
        <img
          src={'src/assets/images/course-img.jpg'}
          alt={`Course cover for ${title}`}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-4">
        <header>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold leading-tight text-slate-600 line-clamp-2">{title}</h3>
            <span className="ml-2 mr-1  text-slate-500 font-medium text-nowrap">{duration} mins</span>
          </div>
          
          <p className="mt-2 text-sm text-zinc-600 line-clamp-3">{description}</p>
        </header>
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Instructor avatar (falls back to initials) */}
            {/* {instructorAvatar ? (
              <img
                src={instructorAvatar}
                alt={`Instructor ${instructorName}`}
                className="h-10 w-10 rounded-full object-cover border border-zinc-200"
                loading="lazy"
              />
            ) : (
              <div
                className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-sm font-medium text-teal-700 border border-zinc-200"
                aria-hidden
              >
                
                {instructorName
                  .split(" ")
                  .map((n) => n.charAt(0))
                  .slice(0, 2)
                  .join("")}
              </div>
            )} */}
            <div className="flex flex-col gap-1">
             
              <div className="">
                <span className="text-slate-700 mr-2">Instructor:</span>
                <span className="text-slate-700 font-medium">{instructorName}</span>
              </div>
            </div>
            
          </div>
          
        </div>
        <div className="flex items-center gap-3 w-full">
          <Link to={`/courses/${courseID}`} 
              className="cursor-pointer flex-1 flex items-center justify-center px-3 py-1.5 rounded-md border border-primary hover:bg-primaryLight font-medium text-primary"
            >
            View
          </Link>
          <button
            onClick={onEnroll}
            type="button"
            className="cursor-pointer flex flex-1 items-center justify-center px-4 py-2 rounded-md font-semibold bg-primary text-white shadow-sm hover:bg-primary/90"
          >
            Enroll
          </button>
        </div>
      </div>
    </article>
  );
}















