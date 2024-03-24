"use client";

import { addNewCourse } from "@/actions/faculty/Courses";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/ui/user/SubmitButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { getStudentsByDepartment } from "@/actions/faculty/GetStudents";

const AddCourseForm = () => {
    const [state, addNewCourseAction] = useFormState(addNewCourse, null);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState("Please Select a Department First");
    const [image, setImage] = useState("");


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
        if (selectedStudents?.length < allStudents?.length && (selectedStudents?.length > 0 || selectedStudents !== null)) {
            let c = students.filter((student) => {
                return student.value !== "**" && student.value !== "*";
            });
            c.unshift({ label: "Select All", value: "*" }, { label: "Clear All", value: "**" });
            setStudents(c);
        }
        else if (selectedStudents?.length === allStudents?.length) {
            let c = students.filter((student) => {
                return student.value !== "**" && student.value !== "*";
            });
            c.unshift({ label: "Clear All", value: "**" });
            setStudents(c);
        }
        else if (selectedStudents === null && document.getElementById("courseDepartment").value !== "") {
            let c = students.filter((student) => {
                return student.value !== "**" && student.value !== "*";
            });
            c.unshift({ label: "Select All", value: "*" });
            setStudents(c);
        }
    }, [selectedStudents]);

    async function departmentChange(e) {
        setEmptyMessage("Loading Students");
        setStudents([]);
        setSelectedStudents(null);
        const department = e.target.value;
        if (department === "") {
            setEmptyMessage("Please Select a Department First");
            setStudents([]);
            setSelectedStudents(null);
            return;
        }
        const res = await (await getStudentsByDepartment(department)).data;
        let students = res.map((student) => {
            return { label: student.name, value: student._id, };
        });
        if (students.length > 0) {
            setStudents([{ label: "Select All", value: "*" }, ...students]);
            setAllStudents(students);
            setEmptyMessage("All Students Selected");
        }
        else {
            setStudents([]);
            setEmptyMessage("No Students Found");
        }
    }

    useEffect(() => {
        if (state?.status) {
            if (state.status === 200) {
                toast.success(state.message, {
                    onClose: () => {
                        document.getElementById("addCourseForm")?.reset();
                        setSelectedStudents(null);
                        setImage("");
                        setStudents([]);
                        setEmptyMessage("Please Select a Department First");
                    },
                    onClick: () => {
                        document.getElementById("addCourseForm")?.reset();
                        setSelectedStudents(null);
                        setImage("");
                        setStudents([]);
                        setEmptyMessage("Please Select a Department First");
                    }
                });
            }
            else {
                toast.error(state.message, {
                    onClose: () => {
                        document.getElementById("addCourseForm").reset();
                        setSelectedStudents(null);
                        setImage("");
                        setStudents([]);
                        setEmptyMessage("Please Select a Department First");
                    },
                    onClick: () => {
                        document.getElementById("addCourseForm").reset();
                        setSelectedStudents(null);
                        setImage("");
                        setStudents([]);
                        setEmptyMessage("Please Select a Department First");
                    }
                });
            }
        }
    }, [state]);




    return (
        <div className="h-screen p-0 w-4/5 mx-auto">
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
                    <label htmlFor="courseDepartment" className="block text-sm font-medium text-gray-700">Department</label>
                    <select name="courseDepartment" id="courseDepartment"
                        className="block h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                        required={true}
                        defaultValue={""}
                        onChange={departmentChange}
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
                        <option value="Computer Science And Engineering" className="max-md:text-sm" >
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
                        noOptionsMessage={() => {
                            return emptyMessage;
                        }}
                        onChange={handleChange}
                        value={selectedStudents}
                    />
                </div>
                <div className="flex flex-col space-y-1 md:space-y-4 mt-4">
                    <label htmlFor="image">Image</label>
                    <div className="flex flex-col max-md:space-y-4 md:flex-row items-center md:justify-evenly">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            id="image"
                            required={true}
                            onChange={(e) => {
                                if (e.target.files[0]?.type !== "image/png" && e.target.files[0]?.type !== "image/jpeg") {
                                    e.target.value = "";
                                    toast.error("Please select only Images", {
                                        onClose: () => {
                                            setImage("");
                                        },
                                    });
                                }
                                else {
                                    setImage(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        {image && (
                            <>
                                <div className="border border-gray-300 px-2 pb-2 pt-1 max-md:w-full max-md:h-[20.5rem] rounded md:flex md:flex-col space-y-1 ">
                                    <IoCloseCircleOutline
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setImage("");
                                            document.getElementById("image").value = "";
                                        }}
                                    />
                                    <Image src={image} alt="Product Image"
                                        className="rounded w-fit md:h-60 md:w-60" height={100} width={100}
                                    />
                                </div>
                            </>
                        )}
                        {
                            !image && (
                                <div className="border border-gray-300 rounded flex px-2 pb-2 pt-1 h-64 w-64 items-center justify-center">
                                    No Image Selected
                                </div>
                            )
                        }
                    </div>
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


export default AddCourseForm;