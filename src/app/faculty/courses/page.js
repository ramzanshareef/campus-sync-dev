import AllCourses from "@/ui/faculty/courses/AllCourses";
import CoursesHomePage from "@/ui/faculty/courses/CoursesHomePage";

export default async function Page({ searchParams }) {
    return (
        <>
            <CoursesHomePage />
            <AllCourses searchParams={searchParams} />
        </>
    );
}