"use client";


import { AttemptedQuizModal } from "@/ui/components/modals/students/AttemptedQuiz";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const IndCourseQuizResults = ({ quizzesResults, course }) => {
    const [showAllQuizzes, setShowAllQuizzes] = useState(false);
    const [showAttemptedQuiz, setShowAttemptedQuiz] = useState(false);
    const [clickedQuiz, setClickedQuiz] = useState({});
    const [clickedQuizAttempt, setClickedQuizAttempt] = useState({});
    const router = useRouter();
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (showAllQuizzes === true) {
            router.push("#all-results");
        }
        else {
            router.push("#all-results-btn");
        }
    }, [showAllQuizzes]);

    useEffect(() => {
        let res = [];
        quizzesResults?.forEach((quiz) => {
            course.quizzes.forEach((courseQuiz) => {
                if (quiz.quizID === courseQuiz._id) {
                    let result = {
                        title: courseQuiz.title,
                        description: courseQuiz.description,
                        score: quiz.score,
                        id: courseQuiz._id
                    };
                    res.push(result);
                }
            });
        });
        setResults(res);
    }, []);

    return (
        <div>
            <div className="mt-6"
                id="all-results-btn"
            >
                <span
                    className="text-lg font-semibold text-gray-800"
                >
                    Quiz Results
                </span>
                <button
                    className="text-white py-2 px-4 max-md:px-2 rounded-md flex items-center mt-2 bg-purple-500 hover:bg-purple-700"
                    onClick={() => {
                        setShowAllQuizzes(!showAllQuizzes);
                    }}
                >
                    {showAllQuizzes === false ? "View All Quiz Results" : "Close All Quiz Results"}
                </button>
            </div>
            <div
                className={`${showAllQuizzes === false ? "hidden" : ""}
                        mt-4 gap-y-2 flex flex-col border border-gray-200 rounded-md p-2 shadow-md shadow-indigo-500
                    `}
                id="all-results"
            >
                {results.map((quiz, index) => (
                    <div
                        key={index}
                        className="flex flex-row w-full hover:bg-gray-100 p-4 rounded-md cursor-pointer"
                        onClick={() => {
                            setClickedQuiz(course.quizzes.find((q) => q._id === quiz.id));
                            setShowAttemptedQuiz(true);
                            setClickedQuizAttempt(quizzesResults.find((q) => q.quizID === quiz.id));
                        }}
                    >
                        <div
                            className="flex flex-col gap-y-1 w-4/5"
                        >
                            <span
                                className="text-lg font-semibold text-gray-800"
                            >
                                {quiz.title}
                            </span>
                            <span
                                className="text-base text-gray-600"
                            >
                                {quiz.description}
                            </span>
                        </div>
                        <div
                            className="flex flex-col gap-y-1 w-1/5 items-end justify-center"
                        >
                            <span
                                className="text-base text-gray-600"
                            >
                                Your Score: {quiz.score}
                            </span>
                            <button
                                className="text-white py-1 px-2 rounded-md flex items-center bg-purple-500 hover:bg-purple-700 h-fit"
                                onClick={() => {
                                    setClickedQuiz(course.quizzes.find((q) => q._id === quiz.id));
                                    setShowAttemptedQuiz(true);
                                    setClickedQuizAttempt(quizzesResults.find((q) => q.quizID === quiz.id));
                                }}
                            >
                                View Quiz
                            </button>
                        </div>
                    </div>
                ))}
                {results.length === 0 && (
                    <div>
                        No Quiz Results
                    </div>
                )}
            </div>
            <AttemptedQuizModal
                isOpen={showAttemptedQuiz}
                onClose={() => setShowAttemptedQuiz(false)}
                quiz={clickedQuiz}
                quizAttempt={clickedQuizAttempt}
            />
        </div>
    );
};

export default IndCourseQuizResults;
IndCourseQuizResults.propTypes = {
    quizzesResults: PropTypes.array,
    course: PropTypes.object
};