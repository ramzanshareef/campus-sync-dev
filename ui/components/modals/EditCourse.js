"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/ui/user/SubmitButton";


async function editCourse(currentState, formData) {
    try {
        console.log(formData);
        let res = await fetch("http://localhost:3000/api/faculty/courses/edit", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await res.json();
        return data;
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export const EditCourseModal = ({ students, course }) => {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => {
        setIsOpen(false);
        window.location.replace("/faculty/courses");
    };
    const [state, addNewCourseAction] = useFormState(editCourse, null);
    const finalStudents = Array.from(course?.students.map((student) => {
        return { value: student._id, label: student.name };
    }));
    const [courseName, setCourseName] = useState(course?.name);
    const [courseCode, setCourseCode] = useState(course?.code);
    const [courseDescription, setCourseDescription] = useState(course?.description);


    useEffect(() => {
        if (state?.status) {
            console.log(state);
        }
    }, [state]);

    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-xl max-h-screen">
                        <form
                            action={addNewCourseAction}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Edit Course</h2><IoIosCloseCircleOutline className="text-3xl cursor-pointer" onClick={onClose} />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                                <input type="text" name="courseName" id="courseName" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
                                <input type="text" name="courseCode" id="courseCode" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={courseCode}
                                    onChange={(e) => setCourseCode(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
                                <textarea name="courseDescription" id="courseDescription" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="students" className="block text-sm font-medium text-gray-700">Select Students</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    isMulti
                                    name="students"
                                    options={students}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    classNames={{
                                        control: (state) =>
                                            state.isFocused ? "border-red-600" : "border-gray-300",
                                    }}
                                    defaultValue={finalStudents}
                                />
                            </div>
                            <div className="mt-4">
                                <SubmitButton
                                    title="Save Changes"
                                    size="fit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
};

EditCourseModal.propTypes = {
    students: PropTypes.array,
    formAction: PropTypes.func,
    course: PropTypes.object,
};