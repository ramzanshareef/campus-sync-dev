import { getAllCourses } from "@/actions/faculty/Courses";
import AllCoursesTable from "./AllCoursesTable";
import { Suspense } from "react";
import AllCoursesTableSkeleton from "@/ui/skeletons/faculty/AllCoursesTable";

export default async function AllCourses({ searchParams }) {
    const data = await (await getAllCourses())?.courses;
    const courses = JSON.parse(JSON.stringify(data));

    return (
        <>
            <h2
                className="text-2xl font-mono text-center mt-4"
            >
                All Courses
            </h2>
            <Suspense fallback={<AllCoursesTableSkeleton />} >
                <AllCoursesTable
                    courses={courses}
                    searchParams={searchParams}
                />
            </Suspense >
        </>
    );
}