"use client";

import { ConfirmDeleteStudentFromCourseByFacultyModal } from "@/ui/components/modals/faculty/ConfirmModal";
import { AddStudentToCourseModal } from "@/ui/components/modals/faculty/ManageCourse";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

const Students = ({ course, remainingStudents }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState({});

    return (
        <>
            <div>
                <div className="flex flex-row justify-between w-full">
                    <h2 className="text-2xl font-serif font-bold mb-2">
                        Manage Students
                    </h2>
                    <button className="px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                        onClick={() => setAddStudentModalOpen(true)}
                    >
                        Add Student
                    </button>
                </div>
                <div className="flex flex-col overflow-x-auto my-4">
                    <div className="flex items-center justify-center border-2 border-gray-200 py-2 rounded-tl-xl rounded-tr-xl ">
                        <div className="w-1/4 text-center font-semibold">Name</div>
                        <div className="w-1/4 text-center font-semibold">Email</div>
                        <div className="w-1/4 text-center font-semibold">Roll No.</div>
                        <div className="w-1/4 text-center font-semibold">Actions</div>
                    </div>
                    {course.students.map((student) => {
                        return (
                            <div key={student._id} className="flex items-center justify-between py-2 overflow-x-auto
                            odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300
                            last-of-type:border-b-0 last-of-type:rounded-bl-xl last-of-type:rounded-br-xl
                        ">
                                <div className="sm:w-1/4 max-sm:mx-2 text-center max-sm:text-wrap sm:overflow-x-auto">{student.name}</div>
                                <div className="sm:w-1/4 max-sm:mx-2 text-center max-sm:text-wrap sm:overflow-x-auto">{student.email}</div>
                                <div className="sm:w-1/4 max-sm:mx-2 text-center max-sm:text-wrap sm:overflow-x-auto">{student.rollNo}</div>
                                <div className="sm:w-1/4 max-sm:mx-2 text-center max-sm:text-wrap sm:overflow-x-auto space-y-2">
                                    <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                        onClick={() => {
                                            setStudentToDelete(student);
                                            setIsOpen(true);
                                        }}
                                    >Remove</button>
                                    <button
                                        className="px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md ml-2"
                                        onClick={() => {
                                            toast.success("Message sent to " + student.name);
                                        }}
                                    >
                                        Message
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <ConfirmDeleteStudentFromCourseByFacultyModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    student={studentToDelete}
                    course={course}
                />
                <AddStudentToCourseModal
                    isOpen={addStudentModalOpen}
                    onClose={() => setAddStudentModalOpen(false)}
                    course={course}
                    remainingStudents={remainingStudents}
                />
            </div>
        </>
    );
};

Students.propTypes = {
    course: PropTypes.object.isRequired,
    remainingStudents: PropTypes.array
};

export default Students;