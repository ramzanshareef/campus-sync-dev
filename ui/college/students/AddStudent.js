"use client";

import { SubmitButton } from "@/ui/user/SubmitButton";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { InstructionsBeforeCollegeUploadStudentsModal } from "@/ui/components/modals/FileUploadInstructions";
import { AddStudent, AddStudents } from "@/actions/college/Students";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const xlsx = require("xlsx");

export default function AddStudentComp({ college }) {
    const [bulkUploadState, addStudentsAction] = useFormState(AddStudents, null);
    const [state, addStudentAction] = useFormState(AddStudent, null);
    const [year, setYear] = useState("");
    const [semSelectValues, setSemSelectValues] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const router = useRouter();
    const effectRan = useRef(false);
    const [data, setData] = useState([]);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        if (bulkUploadState?.status === 200) {
            toast.success(bulkUploadState?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("addStudentsForm")?.reset();
                    setData([]);
                },
            });
        }
        else if (bulkUploadState?.status === 400) {
            toast.error("Please check the Data", {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("addStudentsForm").reset();
                    setData([]);
                },
            });
        }
    }, [bulkUploadState]);

    useEffect(() => {
        if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("addStudentForm")?.reset();
                },
            });
        }
        else {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("addStudentForm").reset();
                },
            });
        }
    }, [state]);

    useEffect(() => {
        if (effectRan.current) return;
        else {
            if (college.college === null || college.college === undefined || college.college === "" || college.college === "N/A") {
                toast.error("Please update your profile to add college name before adding students", {
                    position: "top-right",
                    autoClose: 1200,
                    onClose: () => {
                        router.push("/college/profile");
                    },
                    onClick: () => {
                        router.push("/college/profile");
                    },
                });
            }
            effectRan.current = true;
        }
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center">
                {college?.college === "N/A" ? <p className="text-red-600 text-lg animate-pulse">
                    Please update your profile to add college name before adding students
                </p> : <></>}
                <h2 className="text-2xl my-4 flex flex-col">
                    Add Student
                </h2>
                <form action={addStudentAction} id="addStudentForm"
                    className="space-y-2"
                >
                    <div className="flex flex-row flex-wrap justify-between gap-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                required={true}
                                type="text"
                                name="name"
                                className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="department">Department</label>
                            <select name="department"
                                className="block h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                required={true}
                            >
                                <option value="" className="max-md:text-sm" >Select Department</option>
                                <option value="Bio Technology" className="max-md:text-sm" >
                                    Bio Technology
                                </option>
                                <option value="Civil Engineering" className="max-md:text-sm" >
                                    Civil Engineering
                                </option>
                                <option value="Chemical Engineering" className="max-md:text-sm" >
                                    Chemical Engineering
                                </option>
                                <option value="Computer Science and Engineering" className="max-md:text-sm" >
                                    Computer Science and Engineering
                                </option>
                                <option value="Electrical and Electronics Engineering" className="max-md:text-sm" >
                                    Electrical and Electronics Engineering
                                </option>
                                <option value="Electronics and Communication Engineering" className="max-md:text-sm" >
                                    Electronics and Communication Engineering
                                </option>
                                <option value="Mechanical Engineering" className="max-md:text-sm" >
                                    Mechanical Engineering
                                </option>
                                <option value="Information Technology" className="max-md:text-sm" >
                                    Information Technology
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="year">Year</label>
                            <select name="year"
                                className="block h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                required={true}
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value);
                                    if (e.target.value === "1") {
                                        setSemSelectValues([1, 2]);
                                    }
                                    else if (e.target.value === "2") {
                                        setSemSelectValues([3, 4]);
                                    }
                                    else if (e.target.value === "3") {
                                        setSemSelectValues([5, 6]);
                                    }
                                    else if (e.target.value === "4") {
                                        setSemSelectValues([7, 8]);
                                    }
                                }}
                            >
                                <option value=""
                                    className="max-md:text-sm"
                                >Select Year</option>
                                <option value="1"
                                    className="max-md:text-sm"
                                >1</option>
                                <option value="2"
                                    className="max-md:text-sm"
                                >2</option>
                                <option value="3"
                                    className="max-md:text-sm"
                                >3</option>
                                <option value="4"
                                    className="max-md:text-sm"
                                >4</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="semester">Semester</label>
                            <select name="semester"
                                className="block h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                defaultValue={""}
                                required={true}
                            >
                                <option value=""
                                    className="max-md:text-sm"
                                >Select Semester</option>
                                {semSelectValues.map((sem, i) => (
                                    <option key={i} value={sem}
                                        className="max-md:text-sm"
                                    >{sem}</option>
                                ))}
                            </select>

                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="rollNo">Roll Number</label>
                            <input
                                required={true}
                                type="number"
                                name="rollNo"
                                className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <SubmitButton title="Add Student" size="fit" />
                </form>
            </div>

            {/* Bulk Upload */}
            <div className="flex flex-col justify-center">
                <h2 className="text-2xl my-4 flex flex-col">
                    Add in Bulk
                    <span
                        className="text-xs w-fit text-red-600 cursor-pointer hover:underline"
                        onClick={() => setShowInstructions(true)}
                    >
                        Click Here before uploading
                    </span>
                </h2>
                <form action={addStudentsAction} id="addStudentsForm"
                    className="max-w-md mx-auto flex flex-col justify-center items-center gap-y-4"
                >
                    <input
                        id="image"
                        required={true}
                        type="file"
                        name="students"
                        accept=".xlsx"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsBinaryString(file);
                            reader.onload = (e) => {
                                const bstr = e.target.result;
                                const workbook = xlsx.read(bstr, { type: "binary" });
                                const sheetName = workbook.SheetNames[0];
                                const worksheet = workbook.Sheets[sheetName];
                                const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                                setData(data);
                            };
                        }
                        }
                    />
                    <input type="hidden" name="studentsToAdd"
                        value={data}

                    />
                    <SubmitButton title="Add Students" size="fit" />
                </form>
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-lg my-4">
                    Preview
                </h2>
                <div className="flex justify-center">
                    <table className="table-auto">
                        <thead>
                            {data?.length > 0 && data[0].map((cell, i) => (
                                <th key={i} className="border px-4 py-2">{cell}</th>
                            ))}
                        </thead>
                        <tbody>
                            {data?.length > 0 && data.slice(1).map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="border px-4 py-2">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <InstructionsBeforeCollegeUploadStudentsModal
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
            />
        </>
    );

}

AddStudentComp.propTypes = {
    college: PropTypes.object.isRequired
};