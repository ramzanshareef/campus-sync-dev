"use client";

import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { MdOutlinePreview } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { LuFileBadge } from "react-icons/lu";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const FacultyDashboardMain = ({ user }) => {
    const router = useRouter();
    return (
        <>
            <div className="bg-slate-900 -mt-6 -mr-8">
                <div className="w-full flex flex-wrap items-center justify-around max-sm:flex-col max-sm:justify-center px-16 py-4">
                    <div
                        className="flex-row justify-center items-center gap-x-4 p-4 hidden md:flex"
                    >
                        <Image
                            src={"/logo.svg"}
                            alt="hero"
                            width={500}
                            height={500}
                            className="rounded-full w-16 h-16 border-2 border-white"
                        />
                        <div>
                            <span className="text-slate-500">
                                Welcome back, <br />
                            </span>
                            <span className="text-white font-semibold text-2xl">
                                {user.name}
                            </span>
                        </div>
                    </div>
                    <div
                        className="flex flex-row justify-center items-center gap-x-4 p-4"
                    >
                        <LuFileBadge
                            size={15}
                            className="w-10 h-10 border rounded-full p-2 bg-green-50 text-green-600"
                        />
                        <div className="text-xs">
                            <span className="text-slate-500">
                                Badges earned <br />
                            </span>
                            <span className="text-white font-semibold text-base">
                                24 Badges
                            </span>
                        </div>
                    </div>
                    <div
                        className="flex flex-row justify-center items-center gap-x-4 p-4"
                    >
                        <CiStar
                            size={15}
                            className="w-10 h-10 border rounded-full p-2 bg-red-50 text-red-600"
                        />
                        <div className="text-xs">
                            <span className="text-slate-500">
                                Instructor Rating <br />
                            </span>
                            <span className="text-white font-semibold text-base">
                                4.8 ⭐
                            </span>
                        </div>
                    </div>
                    <div
                        className="flex flex-row justify-center items-center gap-x-4 p-4"
                    >
                        <MdOutlinePreview
                            size={15}
                            className="w-10 h-10 border rounded-full p-2 bg-yellow-50 text-yellow-600"
                        />
                        <div className="text-xs">
                            <span className="text-slate-500">
                                Reviews <br />
                            </span>
                            <span className="text-white font-semibold text-base">
                                1,200 Reviews
                            </span>
                        </div>
                    </div>
                    <button
                        className="bg-indigo-700 text-white rounded-md p-2 hover:bg-indigo-800 transition"
                        onClick={() => router.push("/faculty/courses/add")}
                    >
                        Add New Course
                    </button>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4 justify-around bg-slate-900 h-1/4 px-12 -mr-8">
                <div
                    className="border bg-white rounded-2xl w-28 md:w-fit overflow-auto">
                    <div className="p-4">
                        <Image
                            src={"/static/images/students.svg"}
                            alt="hero"
                            width={500}
                            height={500}
                            className="rounded-full w-16 h-16 p-2 mb-2"
                        />
                        <h2 className="text-slate-500">Total Students</h2>
                        <p className="text-2xl font-bold">120</p>
                    </div>
                </div>
                <div
                    className="border bg-white rounded-2xl w-28 md:w-fit overflow-auto">
                    <div className="p-4">
                        <SiCoursera size={50} className="text-slate-900" />
                        <h2 className="text-slate-500">Total Courses</h2>
                        <p className="text-2xl font-bold">20</p>
                    </div>
                </div>
            </div>
            <div className="p-4">
            </div>
        </>
    );
};

FacultyDashboardMain.propTypes = {
    user: PropTypes.object.isRequired,
};

export default FacultyDashboardMain;