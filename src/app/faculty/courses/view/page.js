import { getCourse } from "@/actions/faculty/Courses";
import { getRemainingStudents } from "@/actions/faculty/GetStudents";
import IndCourse from "@/ui/faculty/courses/IndCourse";
import PropTypes from "prop-types";
import { Suspense } from "react";

export default async function page({ searchParams }) {
    const data = await getRemainingStudents(searchParams.courseID);
    const remainingStudents = await data?.data;
    if (data?.status != 200) {
        return <h1>
            Unable to fetch!!
        </h1>;
    }
    const data2 = await getCourse(searchParams.courseID);
    const course = await data2?.course;
    if (data2?.status != 200) {
        return <h1>
            Unable to fetch!!
        </h1>;
    }
    else {
        return (
            <>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <IndCourse
                        course={JSON.parse(JSON.stringify(course))}
                        remainingStudents={JSON.parse(JSON.stringify(remainingStudents))}
                    />
                </Suspense>
            </>
        );
    }


}

page.propTypes = {
    searchParams: PropTypes.object
};