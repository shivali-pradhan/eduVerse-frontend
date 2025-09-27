import { Link } from "react-router";
import MyAccordion from "../../components/Accordian";
export default function CourseDetailsPage() {
  return (
    <>
      <div className="px-4 py-5 md:px-8 md:py-12 lg:px-18 lg:py-14 flex items-center gap-4 justify-between bg-gradient-to-b from-white to-primaryLight">
        <div className="flex flex-col gap-4">
          <h1 className="text-slate-700 text-4xl font-bold">Course Name</h1>
          <p className="text-slate-500 text-base pl-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illum commodi dignissimos excepturi accusantium. Ab quos, amet recusandae eius necessitatibus nostrum quod totam id, error, ut neque culpa accusamus vel.</p>
          <div className="flex flex-col gap-2 px-2">
            <div className="flex items-center gap-2 text-lg text-slate-700 pl-3">
              <span className="material-icons text-secondary !font-medium">browse_gallery</span>
              <span className="font-medium">Duration:</span>
              <span>20 mins</span>
            </div>
            <div className="flex items-center gap-2.5 text-lg text-slate-700 pl-2.5">
              <span className="material-icons text-secondary !font-medium">school</span>
              <span className="font-medium">Credits:</span>
              <span>4</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-slate-700 mt-1 p-0.5">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-secondary/80 text-white font-semibold flex items-center justify-center">
                TS
              </div>
              <span className="font-medium">Instructor:</span>
              <div className="flex items-center">
                <Link 
                  to={'/'}
                  className="peer"
                >
                  <span className="hover:text-primary">Taylor Swift</span>
                </Link>
                <div className="flex items-center transition-transform scale-0 peer-hover:scale-100 duration-300 ease-in-out">
                  <span className="material-icons !text-2xl text-primary">arrow_right_alt</span>
                </div>
              </div>
            </div>

            <div className="mt-4 px-2">
              <button
              
                className="px-6 py-2.5 rounded-lg bg-primary/90 hover:bg-primary text-white font-semibold cursor-pointer"
              >
                Enroll Now
              </button>
            </div>

          </div>
        
        </div>
        <div className="hidden sm:block">
          <img 
            className="rounded-xl h-2/3"
            src={'/src/assets/images/course-img.jpg'} 
            alt="course image" 
          />
        </div>
      </div>

      <MyAccordion/>

    </>
  );
}