"use client";

import { addNewCourse } from "@/actions/faculty/Courses";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/ui/user/SubmitButton";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseForm = ({ students }) => {
    const [state, addNewCourseAction] = useFormState(addNewCourse, null);
    const [selectedStudents, setSelectedStudents] = useState(null);

    const handleChange = (selected) => {
        setSelectedStudents(selected);
    };

    useEffect(() => {
        if (state?.status) {
            if (state.status === 200) {
                toast.success(state.message, {
                    onClose: () => {
                        document.getElementById("addCourseForm")?.reset();
                        setSelectedStudents(null);

                    },
                    onClick: () => {
                        document.getElementById("addCourseForm")?.reset();
                        setSelectedStudents(null);
                    }
                });
            }
            else {
                toast.error(state.message, {
                    onClose: () => {
                        document.getElementById("addCourseForm").reset();
                    },
                    onClick: () => {
                        document.getElementById("addCourseForm").reset();
                        setSelectedStudents(null);
                    }
                });
            }
        }
    }, [state]);




    return (
        <div className="h-screen p-0">
            <form
                action={addNewCourseAction}
                id="addCourseForm"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Add New Course</h2>
                </div>
                <div className="mt-4">
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input type="text" name="courseName" id="courseName" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
                <div className="mt-4">
                    <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
                    <input type="text" name="courseCode" id="courseCode" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
                <div className="mt-4">
                    <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
                    <textarea name="courseDescription" id="courseDescription" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
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
                        id="students"
                        noOptionsMessage={() => "No students found"}
                        onChange={handleChange}
                        value={selectedStudents}
                    />
                </div>
                <div className="mt-4">
                    <SubmitButton
                        title="Add Course"
                        size="fit"
                    />
                </div>
            </form>
        </div>
    );
};

AddCourseForm.propTypes = {
    students: PropTypes.array,
};

export default AddCourseForm;