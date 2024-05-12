import { getCoursesOfStudent } from "@/actions/student/courses";
import { AllCoursesOfStudentHomePageSkeleton } from "@/ui/skeletons/student/AllCoursesHomePage";
import AllCoursesOfStudentHomePage from "@/ui/student/courses/AllCourses";
import { Suspense } from "react";

export default async function AllCoursesOfStudent() {
    const coursesData = await getCoursesOfStudent();
    if (coursesData.status !== 200) {
        return (
            <div>
                <h1>
                    {coursesData.message}
                </h1>
            </div>
        );
    }
    let courses = JSON.parse(JSON.stringify(coursesData?.courses));
    return (
        <>
            <Suspense fallback={<AllCoursesOfStudentHomePageSkeleton />} >
                <AllCoursesOfStudentHomePage courses={courses} />
            </Suspense >
        </>
    );
}