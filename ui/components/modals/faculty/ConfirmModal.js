"use client";


import { removeStudentFromCourse } from "@/actions/faculty/Courses";
// import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ConfirmDeleteStudentFromCourseByFacultyModal = ({ isOpen, onClose, student, course }) => {
    // const router = useRouter();

    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
                        <p>
                            Are you sure you want to remove <b>{student.name}</b> with Roll Number <b>{student.rollNo}</b> from the course <b>{course.name}</b>?
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
                                    let res = await removeStudentFromCourse(student._id, course._id);
                                    if (res.status === 200) {
                                        onClose();
                                        toast.success(res.message, {
                                            onClose: () => {
                                                window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                            },
                                            onClick: () => {
                                                window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                            }
                                        });
                                    }
                                    else {
                                        onClose();
                                        toast.error(res.message, {
                                            onClose: () => {
                                                window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                            },
                                            onClick: () => {
                                                window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
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

ConfirmDeleteStudentFromCourseByFacultyModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired
};