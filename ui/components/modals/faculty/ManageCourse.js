"use client";

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addStudentsToCourse } from "@/actions/faculty/Courses";

export const AddStudentToCourseModal = ({ isOpen, onClose, course, remainingStudents, setKey }) => {
    const studentsData = remainingStudents.length > 0 ? remainingStudents.map((student) => {
        return { label: student.name, value: student._id };
    }) : [];

    // eslint-disable-next-line no-unused-vars
    const [allStudents, setAllStudents] = useState(studentsData);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [students, setStudents] = useState(studentsData);

    function handleChange(value, event) {
        if (event.action === "select-option" && event.option.value === "*") {
            setSelectedStudents(allStudents);
        }
        else if (event.action === "select-option" && event.option.value === "**") {
            setSelectedStudents(null);
        }
        else {
            setSelectedStudents(value);
        }
    }

    useEffect(() => {
        if (remainingStudents.length === 0) {
            setStudents([]);
        }
    }, [remainingStudents, allStudents]);

    useEffect(() => {
        if (selectedStudents?.length < allStudents?.length && (selectedStudents?.length > 0 || selectedStudents !== null)) {
            let c = students.filter((student) => {
                return student.value !== "**" && student.value !== "*";
            });
            c.unshift({ label: "Select All", value: "*" }, { label: "DeSelect All", value: "**" });
            setStudents(c);
        }
        else if (selectedStudents?.length === allStudents?.length) {
            let c = students.filter((student) => {
                return student.value !== "**" && student.value !== "*";
            });
            c.unshift({ label: "DeSelect All", value: "**" });
            setStudents(c);
        }
        else if (selectedStudents === null) {
            let c = students.filter((student) => {
                return student.value !== "**" && student.value !== "*";
            });
            c.unshift({ label: "Select All", value: "*" });
            setStudents(c);
        }
    }, [selectedStudents]);

    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center max-h-screen">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-md overflow-y-visible max-h-screen">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold mb-2">
                                Add Student
                            </h2>
                        </div>
                        <form action="">
                            <Select
                                closeMenuOnSelect={false}
                                components={makeAnimated()}
                                isMulti
                                name="students"
                                options={students}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                id="students"
                                noOptionsMessage={() => "No Students Left"}
                                onChange={handleChange}
                                value={selectedStudents}
                            />
                        </form>

                        <div className="my-4 flex justify-between">
                            <button
                                onClick={async () => {
                                    let res = await addStudentsToCourse(course._id, selectedStudents);
                                    if (res.status === 200) {
                                        onClose();
                                        toast.success(res.message, {
                                            onClose: () => {
                                                setSelectedStudents(null);
                                                // router.push("/faculty/courses/view?courseID=" + course._id + "&tab=1");
                                                // window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                                setKey(Math.random());
                                            },
                                            onClick: () => {
                                                setSelectedStudents(null);
                                                // router.push("/faculty/courses/view?courseID=" + course._id + "&tab=1");
                                                // window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                                setKey(Math.random());
                                            }
                                        });
                                    }
                                    else {
                                        onClose();
                                        toast.error(res.message, {
                                            onClose: () => {
                                                setSelectedStudents(null);
                                                // router.push("/faculty/courses/view?courseID=" + course._id + "&tab=1");
                                                // window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                                setKey(Math.random());
                                            },
                                            onClick: () => {
                                                setSelectedStudents(null);
                                                // router.push("/faculty/courses/view?courseID=" + course._id + "&tab=1");
                                                // window.location.href = "/faculty/courses/view?courseID=" + course._id + "&tab=4";
                                                setKey(Math.random());
                                            }
                                        });
                                    }
                                }}
                                className="px-2 py-1 bg-indigo-500 text-white rounded-md
                                disabled:opacity-50 disabled:cursor-not-allowed
                                "
                                disabled={selectedStudents === null || selectedStudents.length === 0}
                            >
                                Add
                            </button>
                            <button
                                onClick={onClose}
                                className="px-2 py-1 bg-red-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div >
                :
                <></>
            }
        </>
    );
};

AddStudentToCourseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    remainingStudents: PropTypes.array,
    setKey: PropTypes.func.isRequired
};