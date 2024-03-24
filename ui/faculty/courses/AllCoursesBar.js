"use client";

import { MdOutlineModeEdit } from "react-icons/md";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AllCoursesBar({ courses }) {
    const router = useRouter();

    return (
        <>
            <div className="w-full mx-6 flex flex-nowrap overflow-x-auto">
                {courses.map((course, index) => (
                    <div key={index} className="p-4 min-w-fit">
                        <div className="h-full border-2 border-gray-400 border-opacity-60 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.008]"
                            onClick={() => {
                                router.push(`/faculty/courses/view?courseID=${course._id}&tab=1`);
                            }}
                        >
                            <Image className="lg:h-48 md:h-36 w-full object-cover object-center" src={course.image} alt="blog" width={720} height={400} />
                            <div className="px-6 py-4 flex flex-row justify-between">
                                <h1 className="title-font text-lg font-medium text-gray-900">
                                    {course.name}
                                </h1>
                                <MdOutlineModeEdit className="text-2xl" />
                            </div>
                        </div>
                    </div>
                ))}
                {
                    courses.length === 0 && (
                        <div className="w-full text-center text-2xl my-2">
                            No Courses Found!!
                        </div>
                    )
                }
            </div>
        </>
    );
}

AllCoursesBar.propTypes = {
    courses: PropTypes.array.isRequired
};