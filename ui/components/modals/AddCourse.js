"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/ui/user/SubmitButton";


export const AddCourseModal = ({ students, formAction }) => {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => setIsOpen(false);
    const [state, addNewCourseAction] = useFormState(formAction, null);


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
                                <h2 className="text-2xl font-bold">Add New Course</h2><IoIosCloseCircleOutline className="text-3xl cursor-pointer" onClick={onClose} />
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
                                    classNames={{
                                        control: (state) =>
                                            state.isFocused ? "border-red-600" : "border-gray-300",
                                    }}

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
                </div>
                :
                <></>
            }
        </>
    );
};

AddCourseModal.propTypes = {
    students: PropTypes.array,
    formAction: PropTypes.func,
};