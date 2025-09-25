export async function getAllCourses() {
  try {
    const res = await fetch('http://localhost:8000/courses');
    const data = await res.json();
    console.log(data);
    return data;
  } catch(err) {
    console.log(err);
  }
}