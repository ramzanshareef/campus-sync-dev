import { getAllCourses } from "@/actions/faculty/Courses";
import AddCourseBtn from "./AddCourseBtn";
import AllCoursesBar from "./AllCoursesBar";
import { Suspense } from "react";

export default async function CoursesHomePage() {
    const data = await getAllCourses();
    if (data.status !== 200) {
        return (
            <div>
                <h1>
                    {data.message}
                </h1>
            </div>
        );
    }
    let courses = JSON.parse(JSON.stringify(data?.courses));
    return (
        <>
            <AddCourseBtn />
            <Suspense fallback={<div>Loading...</div>} >
                <AllCoursesBar
                    courses={courses}
                />
            </Suspense >
        </>
    );
}