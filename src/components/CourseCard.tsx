export type CourseCardProps = {
  imageUrl?: string;
  title: string;
  description: string;
  duration: number;
  instructorName: string;
  instructorAvatar?: string;
  onView?: () => void;
  onEnroll?: () => void;
  className?: string;
};
// Tailwind-based responsive course card. Uses the teal theme for primary actions.
// Example usage:
// <CourseCard
//   imageUrl="/images/course-1.jpg"
//   title="Intro to Signal Processing"
//   description="Learn the fundamentals of signals, systems and frequency analysis in a hands-on way."
//   instructorName="Dr. A. Sharma"
//   instructorAvatar="/images/instructor.jpg"
//   onView={() => router.push('/courses/1')}
//   onEnroll={() => enrollCourse(1)}
// />

export default function CourseCard({
  imageUrl,
  title,
  description,
  duration,
  instructorName,
  instructorAvatar,
  onView,
  onEnroll,
  className = "",
}: CourseCardProps) {
  return (
    <article
      className={`max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${className}`}
      aria-label={`Course card: ${title}`}
    >
      {/* Image */}
      <div className="h-44 w-full shrink-0 overflow-hidden bg-zinc-100">
        <img
          src={'src/assets/images/course-2-img.jpeg'}
          alt={`Course cover for ${title}`}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-4">
        <header>
          <div className="flex justify-between items-center pr-1">
            <h3 className="text-xl font-bold leading-tight text-slate-600 line-clamp-2">{title}</h3>
            <span className="text-sm text-slate-500 font-medium">{duration} mins</span>
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
            <div className="text-sm">
              <span className="text-slate-600 mr-2">Created by:</span>
              <span className="text-slate-700 font-medium">{instructorName}</span>
              {/* <p className="text-xs text-zinc-500">Instructor</p> */}
            </div>
          </div>
          
        </div>
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onView}
            type="button"
            className="cursor-pointer flex flex-1 items-center justify-center px-3 py-1.5 rounded-md border border-primary hover:bg-primaryLight font-medium text-primary">
            View
          </button>
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















