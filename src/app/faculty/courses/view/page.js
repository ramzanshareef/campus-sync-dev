import { getAllQuizzesOfCourse, getCourse } from "@/actions/faculty/Courses";
import { getRemainingStudents } from "@/actions/faculty/GetStudents";
import IndCourse from "@/ui/faculty/courses/IndCourse";
import IndCourseSkeleton from "@/ui/skeletons/faculty/IndCourse";
import PropTypes from "prop-types";
import { Suspense } from "react";

export default async function page({ searchParams }) {
    const data = await getRemainingStudents(searchParams.courseID);
    const remainingStudents = await data?.data;
    const data2 = await getCourse(searchParams.courseID);
    const course = await data2?.course;
    const data3 = await getAllQuizzesOfCourse(searchParams.courseID);
    const quizzes = await data3?.quizzes;
    if (data.status !== 200 || data2.status !== 200 || data3.status !== 200) {
        return <h1>Something went wrong</h1>;
    }
    return (
        <>
            <Suspense fallback={<IndCourseSkeleton />}>
                <IndCourse
                    course={JSON.parse(JSON.stringify(course))}
                    remainingStudents={JSON.parse(JSON.stringify(remainingStudents))}
                    quizzes={JSON.parse(JSON.stringify(quizzes))}
                />
            </Suspense>
        </>
    );
}

page.propTypes = {
    searchParams: PropTypes.object
};