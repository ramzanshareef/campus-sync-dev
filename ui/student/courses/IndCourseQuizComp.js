"use client";

import { AttemptQuizModal } from "@/ui/components/modals/students/AttemptQuiz";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const IndCourseQuizComp = ({ quizzes }) => {
    const [showAllQuizzes, setShowAllQuizzes] = useState(false);
    const [showAttemptQuiz, setShowAttemptQuiz] = useState(false);
    const [clickedQuiz, setClickedQuiz] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (showAllQuizzes === true) {
            router.push("#all-quizzes");
        }
        else {
            router.push("#all-quizzes-btn");
        }
    }, [showAllQuizzes]);
    return (
        <div>
            <div className="mt-6"
                id="all-quizzes-btn"
            >
                <span
                    className="text-lg font-semibold text-gray-800"
                >
                    Quizzes
                </span>
                <button
                    className="text-white py-2 px-4 max-md:px-2 rounded-md flex items-center mt-2 bg-purple-500 hover:bg-purple-700"
                    onClick={() => {
                        setShowAllQuizzes(!showAllQuizzes);
                    }}
                >
                    {showAllQuizzes === false ? "View All Quizzes" : "Close All Quizzes"}
                </button>
            </div>
            <div
                className={`${showAllQuizzes === false ? "hidden" : ""}
                        mt-4 gap-y-6 flex flex-col border border-gray-200 rounded-md p-4 shadow-md shadow-indigo-500
                    `}
                id="all-quizzes"
            >
                {quizzes?.map(async (quiz, ind) => {
                    return (
                        <div
                            key={ind}
                            className="flex flex-row justify-between items-center border border-gray-200 rounded-md p-4 shadow-lg"
                        >
                            <div>
                                <h4
                                    className="text-lg font-semibold"
                                >
                                    {quiz.title}
                                </h4>
                                <p
                                    className="text-sm text-gray-500"
                                >
                                    {quiz.description}
                                </p>
                            </div>
                            <div
                                className="flex gap-x-2"
                            >
                                <button
                                    className="text-white py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-700"
                                    onClick={async () => {
                                        setClickedQuiz(quiz);
                                        setShowAttemptQuiz(true);
                                    }}
                                >
                                    Attempt Quiz
                                </button>
                            </div>
                        </div>
                    );
                })}
                {quizzes?.length === 0 && (
                    <div
                        className="text-center"
                    >
                        No quizzes found.
                    </div>
                )}
            </div>
            <AttemptQuizModal
                isOpen={showAttemptQuiz}
                onClose={() => setShowAttemptQuiz(false)}
                quiz={clickedQuiz}
            />
        </div>
    );
};

export default IndCourseQuizComp;
IndCourseQuizComp.propTypes = {
    quizzes: PropTypes.array
};