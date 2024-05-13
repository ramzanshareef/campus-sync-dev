"use client";

import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import { TiTick } from "react-icons/ti";


export const AttemptedQuizModal = ({ isOpen, onClose, quiz, quizAttempt }) => {

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
                        <p
                            className="animate-pulse text-center text-lg font-semibold text-indigo-600"
                        >
                            <span className="font-semibold">Your Score:</span> {quizAttempt.score}/{
                                quiz.questions.reduce((acc, qstn) => {
                                    return acc + qstn.score;
                                }, 0)
                            }
                        </p>
                        <div>
                            <ol>
                                {quiz.questions.map((qstn, ind) => {
                                    return (
                                        <li key={ind} className="border-b border-gray-200 py-2 list-decimal">
                                            <h4 className="text-lg font-semibold">
                                                {qstn.question}
                                                <span
                                                    className="text-sm ml-1 italic"
                                                >
                                                    ({qstn.score} points)
                                                </span>
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
                                                            {quizAttempt.responses.map((resp, i) => {
                                                                if (resp.question === qstn._id && resp.selectedOption === opt._id) {
                                                                    return (
                                                                        <span
                                                                            key={i}
                                                                            className="ml-2 text-sm italic"
                                                                        >
                                                                            (Your Response)
                                                                        </span>
                                                                    );
                                                                }
                                                            })}
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
                                type="submit"
                                className="flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                disabled:cursor-not-allowed disabled:shadow-none disabled:bg-indigo-400 disabled:hover:bg-indigo-400 disabled:focus-visible:outline-indigo-400 disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-2 w-fit"
                                onClick={onClose}
                            >
                                Close Quiz
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
    quiz: PropTypes.object.isRequired,
    quizAttempt: PropTypes.object.isRequired
};