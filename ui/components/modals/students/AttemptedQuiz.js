"use client";

import PropTypes from "prop-types";
import { useEffect } from "react";
import { getAttemptedQuizData } from "@/actions/student/courses";
import { TiTick } from "react-icons/ti";
import { MdClose } from "react-icons/md";

export const AttemptedQuizModal = ({ isOpen, onClose, quiz }) => {

    useEffect(() => {
        if (isOpen === true) {
            (async () => {
                const data = await getAttemptedQuizData(quiz._id);
                console.log(data);
            })();
        }
    }, [quiz]);

    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
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
                                                {qstn.question}
                                            </h4>
                                            <ol
                                                className="flex flex-col"
                                            >
                                                {qstn.options.map((opt, index) => {
                                                    return (
                                                        <li key={index}
                                                            className={`${opt.correct ? "text-green-500" : "text-red-500"}
                                                            flex items-center
                                                            `}
                                                        >
                                                            {opt.correct ?
                                                                <TiTick className="mr-2" />
                                                                :
                                                                <MdClose className="mr-2" />}
                                                            {opt.option}
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
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-100 text-gray-800 rounded-md mr-4"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
                :
                <></>
            }
        </>
    );
};

AttemptedQuizModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired
};