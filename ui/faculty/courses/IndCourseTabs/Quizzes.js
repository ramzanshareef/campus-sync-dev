"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import { StepperWithContent } from "./quiz/stepper";
import { useRouter } from "next/navigation";
import { ExistingQuizModal } from "@/ui/components/modals/faculty/ExistingQuizModal";
import { DeleteExistingQuizModal } from "@/ui/components/modals/faculty/DeleteExistingQuizModal";


const Quizzes = ({ course, quizzes }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);
    const [showAllQuizzes, setShowAllQuizzes] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);
    const [clikedQuiz, setClickedQuiz] = useState({});
    const [key, setKey] = useState(0);
    const router = useRouter();
    return (
        <>
            <div
                key={key}
            >
                <div className="flex flex-row max-md:flex-col justify-between items-center w-full">
                    <span className="md:text-xl text-lg font-semibold mt-4 mb-4">
                        All Quizzes
                    </span>
                </div>
                <div>
                </div>
                <div className="flex gap-x-2">
                    <button
                        className={`text-white py-2 px-4 max-md:px-2 rounded-md flex items-center mt-2
                        ${showCreateQuiz === false ? "bg-indigo-500 hover:bg-indigo-700" : "bg-red-500 hover:bg-red-700"}
                    `}
                        onClick={() => {
                            if (showCreateQuiz === true) {
                                setShowCreateQuiz(!showCreateQuiz);
                                router.push(`/faculty/courses/view?courseID=${course._id}&tab=2`);
                            }
                            else {
                                setShowCreateQuiz(!showCreateQuiz);
                                router.push(`/faculty/courses/view?courseID=${course._id}&tab=2#create-quiz`);
                            }
                        }}

                    >
                        {showCreateQuiz === false ? "Create Quiz" : "Close"}
                    </button>
                    <button
                        className="text-white py-2 px-4 max-md:px-2 rounded-md flex items-center mt-2 bg-purple-500 hover:bg-purple-700"
                        onClick={() => {
                            if (showAllQuizzes === true) {
                                setShowAllQuizzes(!showAllQuizzes);
                                router.push(`/faculty/courses/view?courseID=${course._id}&tab=2`);
                            }
                            else {
                                setShowAllQuizzes(!showAllQuizzes);
                                router.push(`/faculty/courses/view?courseID=${course._id}&tab=2#all-quizzes`);
                            }
                        }}
                    >
                        {showAllQuizzes === false ? "View All Quizzes" : "Close All Quizzes"}
                    </button>
                </div>
                <div
                    className={`${showCreateQuiz === false ? "hidden" : ""}
                        mt-4 border border-gray-200  rounded-md p-4 shadow-2xl
                    `}
                    id="create-quiz"
                >
                    <h3
                        className="text-lg font-semibold mt-2"
                    >
                        Create Quiz
                    </h3>
                    <StepperWithContent
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        course={course}
                    />
                </div>
                <div
                    className={`${showAllQuizzes === false ? "hidden" : ""}
                        mt-4 gap-y-6 flex flex-col border border-gray-200 rounded-md p-4 shadow-md shadow-indigo-500
                    `}
                    id="all-quizzes"
                >
                    {quizzes.map((quiz, ind) => {
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
                                        onClick={() => {
                                            setClickedQuiz(quiz);
                                            setShowQuizModal(true);
                                        }}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="text-white py-2 px-4 rounded-md bg-red-500 hover:bg-red-700"
                                        onClick={() => {
                                            setClickedQuiz(quiz);
                                            setShowDeleteQuizModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {quizzes.length === 0 && (
                        <div
                            className="text-center"
                        >
                            No quizzes found.
                        </div>
                    )}
                </div>
            </div>
            <ExistingQuizModal
                isOpen={showQuizModal}
                onClose={() => setShowQuizModal(false)}
                quiz={clikedQuiz}
            />
            <DeleteExistingQuizModal
                isOpen={showDeleteQuizModal}
                onClose={() => setShowDeleteQuizModal(false)}
                quiz={clikedQuiz}
                course={course}
                setKey={setKey}
            />
        </>
    );
};

Quizzes.propTypes = {
    course: PropTypes.object.isRequired,
    quizzes: PropTypes.array
};

export default Quizzes;