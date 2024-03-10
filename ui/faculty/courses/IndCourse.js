"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import GeneralInfo from "./IndCourseTabs/GeneralInfo";
import Assignments from "./IndCourseTabs/Assignments";
import Grades from "./IndCourseTabs/Grades";
import Students from "./IndCourseTabs/Students";
import Resources from "./IndCourseTabs/Resources";
import Settings from "./IndCourseTabs/Settings";
import { IoSettingsOutline } from "react-icons/io5";
import { GrStatusInfo } from "react-icons/gr";
import { MdAssignment } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { PiExam } from "react-icons/pi";
import { useRouter, useSearchParams } from "next/navigation";


const IndCourse = ({ course, remainingStudents }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currTab, setCurrTab] = useState(searchParams.get("tab") || 1);
    const corrData = {
        1: <div className="flex items-center gap-x-2">
            General Info
            <GrStatusInfo className="inline-block text-lg" />
        </div>,
        2: <div className="flex items-center gap-x-2">
            Assignments
            <MdAssignment className="inline-block text-lg" />
        </div>,
        3: <div className="flex items-center gap-x-2">
            Grades
            <PiExam className="inline-block text-lg" />
        </div>,
        4: <div className="flex items-center gap-x-2">
            Students
            <PiStudentLight className="inline-block text-lg " strokeWidth={12} />
        </div>,
        5: <div className="flex items-center gap-x-2">
            Resources
            <GrResources className="inline-block text-lg" />
        </div>,
        6: <div className="flex items-center gap-x-2">
            Settings
            <IoSettingsOutline className="inline-block text-lg" />
        </div>
    };
    const tabData = {
        1: <GeneralInfo course={course} />,
        2: <Assignments course={course} />,
        3: <Grades course={course} />,
        4: <Students course={course} remainingStudents={remainingStudents} />,
        5: <Resources course={course} />,
        6: <Settings course={course} />
    };

    return (
        <div className="container mx-auto mt-8 px-8">
            <div className="rounded-lg overflow-hidden shadow-md">
                <div className="p-6 bg-gradient-to-r from-cyan-700 to-blue-600 text-white">
                    <h2 className="text-4xl font-serif mb-1">{course.name}</h2>
                    <div className="font-medium text-gray-300 text-sm">{course.code}</div>
                </div>
            </div>
            <div>
                {Object.keys(corrData).map((key, ind) => {
                    return (
                        <button key={ind}
                            onClick={() => {
                                setCurrTab(key);
                                router.push(`/faculty/courses/view?courseID=${course._id}&tab=${key}`);
                            }}
                            className={` px-2 py-4 border-b-2 
                                ${currTab === key ? "border-b-2 border-indigo-500 text-indigo-500" : "hover:border-gray-400"}`}
                        >
                            {corrData[key]}
                        </button>
                    );
                })}
                <div
                    className="my-4"
                >
                    {tabData[currTab]}
                </div>

            </div>
        </div>
    );
};

IndCourse.propTypes = {
    course: PropTypes.object.isRequired,
    remainingStudents: PropTypes.array
};

export default IndCourse;