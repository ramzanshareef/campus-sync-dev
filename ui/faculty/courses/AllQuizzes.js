
import { getAllQuizzesOfCourse } from "@/actions/faculty/Courses";
import PropTypes from "prop-types";

const AllQuizzes = async ({ courseID }) => {
    const quizzes = await getAllQuizzesOfCourse(courseID);
    console.log(quizzes);
    return (
        <>
            <div>
                <h1>
                    All Quizzes for course with ID: {courseID}
                </h1>
            </div>
        </>
    );
};

AllQuizzes.propTypes = {
    courseID: PropTypes.string
};

export default AllQuizzes;