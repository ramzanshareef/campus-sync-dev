"use client";

import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const InstructionsBeforeCollegeUploadStudentsModal = ({ isOpen, onClose }) => {
    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-xl overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-4">
                            <IoIosCloseCircleOutline
                                onClick={onClose}
                                className="cursor-pointer float-right"
                            />
                        </h2>
                        <div>
                            <p className="text-2xl font-semibold mb-4">Instructions</p>
                            <ol className="list-decimal px-4">
                                <li className="my-1">The file <b>must</b> be in .xlsx format</li>
                                <li className="my-1">
                                    The file <b>must</b> contain the following columns in the same order:
                                    <ol className="list-decimal">
                                        <li className="ml-6">Name</li>
                                        <li className="ml-6">Department</li>
                                        <li className="ml-6">Year</li>
                                        <li className="ml-6">Semester</li>
                                        <li className="ml-6">Roll No</li>
                                    </ol>
                                </li>
                                <li className="my-1">The file <b>must</b> contain the above headers</li>
                                <li className="my-1">The Department <b>must</b> be in the format of
                                    Computer Science and Engineering, Electronics and Communication Engineering, Information Technology,
                                    etc.
                                </li>
                                <li className="my-1">The file <b>must not</b> contain any empty cells</li>
                                <li className="my-1">The file <b>must not</b> contain any special characters</li>
                                <li className="my-1">The file <b>must not</b> contain any duplicate roll numbers</li>
                            </ol>
                            <p className="text-[1.15rem] text-red-600 mb-4 animate-pulse">
                                Note : If the file does not meet the above mentioned criteria, the upload will fail and the students will not be added to the database
                            </p>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
};

InstructionsBeforeCollegeUploadStudentsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object
};

export const InstructionsBeforeCollegeUploadFacultyModal = ({ isOpen, onClose }) => {
    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-xl overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-4">
                            <IoIosCloseCircleOutline
                                onClick={onClose}
                                className="cursor-pointer float-right"
                            />
                        </h2>
                        <div>
                            <p className="text-2xl font-semibold mb-4">Instructions</p>
                            <ol className="list-decimal px-4">
                                <li className="my-1">The file <b>must</b> be in .xlsx format</li>
                                <li className="my-1">
                                    The file <b>must</b> contain the following columns in the same order:
                                    <ol className="list-decimal">
                                        <li className="ml-6">Name</li>
                                        <li className="ml-6">Department</li>
                                    </ol>
                                </li>
                                <li className="my-1">The file <b>must</b> contain the above headers</li>
                                <li className="my-1">The Department <b>must</b> be in the format of
                                    Computer Science and Engineering, Electronics and Communication Engineering, Information Technology,
                                    etc.
                                </li>
                                <li className="my-1">The file <b>must not</b> contain any empty cells</li>
                                <li className="my-1">The file <b>must not</b> contain any special characters</li>
                                <li className="my-1">The file <b>must not</b> contain any duplicate faculty names</li>
                            </ol>
                            <p className="text-[1.15rem] text-red-600 mb-4 animate-pulse">
                                Note : If the file does not meet the above mentioned criteria, the upload will fail and the faculties will not be added to the database
                            </p>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
};

InstructionsBeforeCollegeUploadFacultyModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
