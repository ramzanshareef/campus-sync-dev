"use client";


import { removeQuizFromCourse } from "@/actions/faculty/Courses";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export const DeleteExistingQuizModal = ({ isOpen, onClose, quiz, course, setKey }) => {

    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-top inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
                        <p>
                            Are you sure you want to delete <b>{quiz.title}</b> from the course <b>{course.name} </b>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-100 text-gray-800 rounded-md mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    let res = await removeQuizFromCourse(course._id, quiz._id);
                                    if (res.status === 200) {
                                        onClose();
                                        toast.success(res.message, {
                                            onClose: () => {
                                                setKey(Math.random());
                                            },
                                            onClick: () => {
                                                setKey(Math.random());
                                            }
                                        });
                                    }
                                    else {
                                        onClose();
                                        toast.error(res.message, {
                                            onClose: () => {
                                                setKey(Math.random());
                                            },
                                            onClick: () => {
                                                setKey(Math.random());
                                            }
                                        });
                                    }
                                }}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                            >
                                Yes
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

DeleteExistingQuizModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired,
    course: PropTypes.string.isRequired,
    setKey: PropTypes.func.isRequired
};