"use client";

import PropTypes from "prop-types";
import { useFormState } from "react-dom";
import { attemptQuiz } from "@/actions/student/courses";
import { useEffect } from "react";
import { SubmitButton } from "@/ui/user/SubmitButton";
import { toast } from "react-toastify";


export const AttemptQuizModal = ({ isOpen, onClose, quiz }) => {
    const [state, attemptQuizAction] = useFormState(attemptQuiz, null);

    useEffect(() => {
        if (state?.status) {
            if (state.status === 200) {
                toast.success(state.message, {
                    onClose: () => {
                        onClose();
                    },
                    onClick: () => {
                        onClose();
                    }
                });
            }
            else {
                toast.error(state.message, {
                    onClose: () => {
                        onClose();
                    },
                    onClick: () => {
                        onClose();
                    }
                });
            }
        }
    }, [state]);

    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <form
                        className="w-full"
                        action={attemptQuizAction}
                    >
                        <input type="hidden" name="quizID" value={quiz._id} />
                        <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
                            <h2 className="text-2xl font-semibold text-center">
                                {quiz.title}
                            </h2>
                            <p className="text-gray-500 text-center">
                                {quiz.description}
                            </p>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    Questions
                                    <span
                                        className="text-sm ml-1 italic"
                                    >
                                        ({quiz.questions.length})
                                    </span>
                                </h3>
                                <ol className="mt-2">
                                    {quiz.questions.map((qstn, ind) => {
                                        return (
                                            <li key={ind} className="border-b border-gray-200 py-2 list-decimal">
                                                <h4 className="text-lg font-semibold">
                                                    {qstn.question} {" "}
                                                    <span className="text-xs">
                                                        {qstn.score} points
                                                    </span>
                                                </h4>
                                                <ol
                                                    className="flex flex-col"
                                                >
                                                    {qstn.options.map((opt) => {
                                                        return (
                                                            <li key={opt._id}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={qstn._id}
                                                                    id={opt._id}
                                                                    value={opt._id}
                                                                />
                                                                <label
                                                                    htmlFor={opt._id}
                                                                    className="ml-2"
                                                                >
                                                                    {opt.option}
                                                                </label>
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                            <div className="flex justify-end mt-4">
                                <SubmitButton
                                    title="Submit Quiz"
                                    size="fit"
                                />
                            </div>

                        </div>
                    </form>
                </div>
                :
                <></>
            }
        </>
    );
};

AttemptQuizModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired
};