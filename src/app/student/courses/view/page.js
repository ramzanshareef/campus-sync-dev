import { getCourseDetailsByStudent } from "@/actions/student/courses";
import IndCourse from "@/ui/student/courses/IndCourse";
import PropTypes from "prop-types";
import { Suspense } from "react";

export default async function page({ searchParams }) {
    const data = await getCourseDetailsByStudent(searchParams.courseID);
    if (data.status !== 200 ) {
        return <h1>Something went wrong</h1>;
    }
    let course = JSON.parse(JSON.stringify(data.course));
    return (
        <>
            <Suspense fallback={
                <div>
                    Loading..
                </div>
            }>
                <IndCourse courseData={course} />
            </Suspense>
        </>
    );
}

page.propTypes = {
    searchParams: PropTypes.object
};