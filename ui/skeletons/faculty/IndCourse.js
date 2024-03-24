"use client";

import { useState } from "react";
import Settings from "../../faculty/courses/IndCourseTabs/Settings";
import Resources from "../../faculty/courses/IndCourseTabs/Resources";
import Students from "../../faculty/courses/IndCourseTabs/Students";
import Grades from "../../faculty/courses/IndCourseTabs/Grades";
import Assignments from "../../faculty/courses/IndCourseTabs/Quizzes";
import GeneralInfo from "../../faculty/courses/IndCourseTabs/GeneralInfo";
import { IoSettingsOutline } from "react-icons/io5";
import { GrStatusInfo } from "react-icons/gr";
import { MdAssignment } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { PiExam } from "react-icons/pi";
import { useSearchParams } from "next/navigation";


const IndCourseSkeleton = () => {
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
        1: <GeneralInfo  />,
        2: <Assignments  />,
        3: <Grades  />,
        4: <Students />,
        5: <Resources  />,
        6: <Settings  />
    };

    return (
        <div className="container mx-auto px-8">
            <div className="rounded-lg overflow-hidden shadow-md">
                <div className="p-6 bg-gradient-to-r from-cyan-700 to-blue-600 text-white">
                    <h2 className="text-4xl font-serif mb-1">
                        <p className="text-4xl font-serif mb-1 animate-pulse bg-gradient-to-r from-cyan-700 to-blue-600 text-transparent bg-clip-text">
                        </p>
                    </h2>
                    <div className="font-medium text-gray-300 text-sm">
                        <h3 className="text-2xl font-serif mb-1 
                            animate-pulse bg-gradient-to-r from-cyan-700 to-blue-600 text-transparent bg-clip-text
                        ">
                        </h3>
                        <p className="text-lg font-serif mb-1 
                            animate-pulse bg-gradient-to-r from-cyan-700 to-blue-600 text-transparent bg-clip-text
                        ">
                        </p>
                    </div>
                </div>
            </div>
            <div>
                {Object.keys(corrData).map((key, ind) => {
                    return (
                        <button key={ind}
                            onClick={() => {
                                setCurrTab(key);
                                // router.push(`/faculty/courses/view?courseID=${course._id}&tab=${key}`);
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

export default IndCourseSkeleton;