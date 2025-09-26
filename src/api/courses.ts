export async function getAllCourses(page_num: number, page_size: number, searchText: string) {
  try {
    const res = await fetch(`http://localhost:8000/courses?page_num=${page_num}&page_size=${page_size}&search=${searchText}`);
    const data = await res.json();
    console.log(data);
    if (data.items) return data;
    else return {message: "Something went wrong"};
  } catch(err) {
    console.log(err);
  }
}