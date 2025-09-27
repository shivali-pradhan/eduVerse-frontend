import { useState, useEffect } from "react";
import { getAllCourses } from "../../api/courses";
import CourseCard from "../../components/CourseCard";
import Pagination from "../../components/Pagination";

export default function AllCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [courses, setCourses] = useState<Array<{[key: string]: any}>>([]);

  const [searchText, setSearchText] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const pageSize = 3;

  const fetchCourses = async (page: number, search: string = "") => {
    const response = await getAllCourses(page, pageSize, search);
    if (response.items) {
      setCourses(response.items);
      const num_pages = Math.ceil(response.total_items / pageSize);
      setTotalPages(num_pages);
      setCurrentPage(page);
    }
    else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    fetchCourses(1);
  }, []);

  const handlePageChange = (page: number) => fetchCourses(page);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if(!e.target.value) {
      setIsSearchClicked(false);
      fetchCourses(1);
    }
  };
  const handleSearch = () => {
    if(searchText) setIsSearchClicked(true);
    fetchCourses(currentPage, searchText);

  }

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const options = ["name", "credits", "duration"];
  const sortFields = [
    {
      field: "name",
      text: "Course title",
    },
    {
      field: "duration",
      text: "Duration"
    },
    {
      field: "instructor.first_name",
      text: "Instructor"
    }
  ];
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };
  
  return (
    <>
    <div className="bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#ffffff]">
      
      <div className="flex items-center w-full justify-between py-2 px-8 bg-slate-100">
        <h1 className="text-2xl text-center my-3 font-semibold text-primary">All Courses</h1>
        <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 relative">
          
          <input 
            type="text"
            className="peer flex-1 bg-white w-84 px-4 py-2 rounded-full outline-none border-1 border-gray-300 focus:shadow-sm text-slate-700"
            placeholder="Search courses..."
            onChange={handleSearchInputChange}
          />
          <button
            className="cursor-pointer absolute right-2 text-slate-400 peer-focus:text-primary"
            onClick={handleSearch}
          >
            <span className="material-icons !text-3xl">search</span>
          </button>
            
        </div>
        <div className="">
          <div className="relative flex flex-col items-end">
            <button
              className="flex items-center justify-center text-slate-600 font-medium border border-gray-300 rounded-full px-6 py-2 cursor-pointer bg-white  hover:bg-gray-50"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span>Sort</span>
              <span className="material-icons">arrow_drop_down</span>
            </button>
            
          
            {isOpen && (
              <ul className="absolute top-10 w-40 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2 text-slate-600 cursor-pointer hover:bg-primaryLight ${
                      option === selected ? "bg-primaryLight text-primary font-medium" : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        </div>
  
      </div>
    
     
      <div className="pt-12 pb-20 px-3 sm:px-4 md:px-8 lg:px-14 ">
        <div className={`text-xl text-slate-600 ${isSearchClicked ? 'block': 'hidden'}`}>
          {courses.length ? `Search results: ${courses.length}` : (
            <div className="my-4 flex flex-col items-center justify-center">
              <img 
                src="src/assets/images/no-results.jpg" alt="No search results" 
                className="h-64 opacity-70"
              />
              <p>No courses found.</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 place-items-center items-stretch">
        
          {
            courses && courses.map((course) => {
              return (
                <CourseCard key={course.id}
                  courseID={course.id}
                  title={course.name} 
                  description={course.description} 
                  duration={course.duration}
                  instructorName={course.creator.first_name + ' ' + course.creator.last_name}
                />
              );
            })
          }
        </div>
        {
          totalPages > 1 &&  
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        }
      </div>
      
      
    </div>
    
    
    </>
    

  )
}
