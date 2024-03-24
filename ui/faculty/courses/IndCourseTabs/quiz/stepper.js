"use client";

import Image from "next/image";
import { useState } from "react";
import QuestionsMain from "./QuestionsMain";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function StepperWithContent({ activeStep, setActiveStep, course }) {
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");

    const steps = [
        {
            content: <>
                <div className="flex flex-col gap-y-4 w-full" >
                    <div className="bg-white rounded-md p-4 shadow-md" >
                        <p className="text-lg font-semibold text-gray-800" >
                            Selected Course
                        </p>
                        <div
                            className="flex flex-row items-center mt-2 bg-gray-100 text-gray-900 rounded-xl w-full h-16 p-4 py-10 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-200 aria-disabled:text-gray-600 aria-disabled:opacity-80 aria-disabled:shadow-md aria-disabled:rounded-xl"
                            aria-disabled="true"
                        >
                            <Image
                                src={course.image}
                                alt="Deep Learning Course"
                                width={40}
                                height={40}
                                className="rounded-full w-12 h-12 object-center overflow-hidden"
                            />
                            <div
                                className="flex flex-col ml-2"
                            >
                                <span
                                    className="text-sm font-semibold"
                                    id="course-title"
                                >
                                    {course.name}
                                </span>
                                <span
                                    className="text-xs"
                                >
                                    10 Lessons
                                </span>
                            </div>

                            <div className="flex gap-10 ml-auto">
                                <div className="inline-flex items-center">
                                    <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                        htmlFor="course-title"
                                    >
                                        <input name="type" type="radio"
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-indigo-200 text-indigo-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-indigo-500 before:opacity-0 before:transition-opacity checked:border-indigo-600 checked:before:bg-indigo-600 hover:before:opacity-10"
                                            defaultChecked
                                        />
                                        <span
                                            className="absolute text-indigo-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div
                        className="bg-white rounded-md p-4 shadow-md"
                    >
                        <p
                            className="text-lg font-semibold text-gray-800"
                        >
                            Select a Lesson
                        </p>
                        <span
                            className="text-xs text-gray-600"
                        >
                            You have selected a course, now select a lesson to create a quiz.
                        </span>
                        <input type="text"
                            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600"
                            placeholder="Search for a lesson"
                            value={"Lesson 1: Introduction to Deep Learning"}
                            disabled={true}
                        />
                    </div>
                </div>
            </>
        },
        {
            content: <Step2
                quizTitle={quizTitle}
                setQuizTitle={setQuizTitle}
                quizDescription={quizDescription}
                setQuizDescription={setQuizDescription}
            />
        },
        {
            content: <QuestionsMain
                quizTitle={quizTitle}
                quizDescription={quizDescription}
            />
        }
    ];



    const handleNext = () => {
        if (activeStep === 2) {
            setIsLastStep(true);
        }
        if (activeStep === 1) {
            setIsFirstStep(false);
        }
        setActiveStep((cur) => cur + 1);
    };
    const handlePrev = () => {
        if (activeStep === 2) {
            setIsFirstStep(true);
        }
        if (activeStep === 3) {
            setIsLastStep(false);
        }
        setActiveStep((cur) => cur - 1);
    };

    return (
        <div className="w-full py-4">
            <div className="flex justify-between">
                <div className="flex flex-col w-full gap-y-3">
                    <span className="text-lg font-semibold flex justify-between">
                        <span
                            className="text-sm font-semibold relative top-0 right-0"
                        >{activeStep}/3</span>
                    </span>
                    <div>
                        {steps[activeStep - 1].content}
                    </div>
                </div>
            </div>
            <ButtonHandler
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
                handleNext={handleNext}
                handlePrev={handlePrev}
                nextDisabled={activeStep === 2 && (quizTitle.length < 5 || quizDescription.length < 10)}
            />
        </div>
    );
}

StepperWithContent.propTypes = {
    activeStep: PropTypes.number.isRequired,
    setActiveStep: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
};

const Step2 = ({ quizTitle, setQuizTitle, quizDescription, setQuizDescription }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                Quiz Title
            </label>
            <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600 "
                placeholder="Enter the title of the quiz"
                minLength={5}
                required
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">
                Quiz Description
            </label>
            <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600"
                placeholder="Enter the description of the quiz"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                minLength={10}
            />

        </div>
    );
};
Step2.propTypes = {
    quizTitle: PropTypes.string.isRequired,
    setQuizTitle: PropTypes.func.isRequired,
    quizDescription: PropTypes.string.isRequired,
    setQuizDescription: PropTypes.func.isRequired
};

const ButtonHandler = ({ isLastStep, isFirstStep, handleNext, handlePrev, nextDisabled }) => {
    const router = useRouter();
    return (
        <div className="mt-32 flex justify-between">
            <button
                disabled={isFirstStep}
                onClick={handlePrev}
                className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
                Prev
            </button>
            <button
                onClick={() => {
                    if (isLastStep) {
                        toast.success("Quiz Created Successfully",{
                            onClick: () => {
                                router.push("/faculty/courses");
                            },
                            onClose: () => {
                                router.push("/faculty/courses");
                            }
                        });
                    }
                    else {
                        if (!nextDisabled) {
                            handleNext();
                        }
                        else {
                            toast.error("Please Enter the Quiz Title and Description");
                        }
                    }
                }}
                className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
                {isLastStep ? "Finish" : "Next"}
            </button>
        </div>
    );
};
ButtonHandler.propTypes = {
    isLastStep: PropTypes.bool.isRequired,
    isFirstStep: PropTypes.bool.isRequired,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool.isRequired
};