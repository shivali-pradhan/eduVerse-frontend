import { useEffect } from "react";
import { getAllCourses } from "../../api/courses";
import CourseCard from "../../components/CourseCard";

export default function AllCourses() {
  const desc = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet fugiat possimus ipsum non suscipit facilis modi dolorum ipsa doloribus provident. Alias laudantium ad quos, ratione rerum voluptate suscipit quam eaque."
  const fetchAllCourses = async () => {
    return getAllCourses();
  }
  useEffect(() => {
    fetchAllCourses();
  }, [])
  return (
    <>
    <div className="bg-gradient-to-br from-[#f4fcfd] via-[#f3feff] to-[#dff6f8] py-12 px-24">
      <h1 className="text-2xl my-3 font-semibold text-primary">All courses</h1>
      <div className="grid grid-cols-4 gap-6">
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
        <CourseCard title="Web Development" description={desc} duration={50} instructorName="Taylor Swift"/>
      </div>
    </div>
    
    
    </>
    

  )
}
