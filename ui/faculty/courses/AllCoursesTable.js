"use client";

import PaginationBar from "@/ui/components/Pagination";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const AllCoursesTable = ({ courses, searchParams }) => {
    const router = useRouter();

    return (
        <div className="px-6">
            <table className="max-md:win-w-full md:w-5/6 mx-auto text-gray-900 overflow-x-auto" id="courses">
                <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                    <tr>
                        <th className="px-4 py-5 text-center">
                            Name
                        </th>
                        <th className="px-4 py-5 text-center">
                            Code
                        </th>
                        <th className="px-4 py-5 text-center">
                            Description
                        </th>
                        <th className="px-4 py-5 text-center">
                            No of Students
                        </th>
                        <th className="px-4 py-5 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-x-auto">
                    {
                        courses.length === 0 &&
                        <tr>
                            <td colSpan="5" className="text-center py-3">
                                No Courses found
                            </td>
                        </tr>
                    }
                    {courses?.map((course, index) => (
                        <tr
                            key={index}
                            className="w-full border-b py-3 text-sm last-of-type:border-none                       
                                    hover:bg-gray-300 cursor-pointer
                                    transition duration-300 ease-in-out
                                    odd:bg-gray-100 even:bg-gray-200 
                                    [&:first-child>td:first-child]:rounded-tl-2xl 
                                    [&:first-child>td:last-child]:rounded-tr-2xl
                                    [&:last-child>td:first-child]:rounded-bl-2xl
                                    [&:last-child>td:last-child]:rounded-br-2xl
                                    "
                        >
                            <td className="py-3 pl-6 pr-3 text-center">
                                {course.name}
                            </td>
                            <td className="text-center px-4">
                                {course.code}
                            </td>
                            <td className="text-center px-4">
                                {course.description}
                            </td>
                            <td className="text-center px-4">
                                {course.students.length}
                            </td>
                            <td className="text-center px-4">
                                <p
                                    className="flex justify-center gap-x-2 text-green-600 hover:underline-offset-2 hover:underline"
                                    onClick={() => {
                                        router.push(`/faculty/courses/edit?courseID=${course._id}`);
                                    }}

                                >
                                    Edit
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationBar
                itemsLength={courses.length || 0}
                currentPage={searchParams.page || 1}
                tableID="courses"
            />
        </div>
    );
};

AllCoursesTable.propTypes = {
    courses: PropTypes.array,
    searchParams: PropTypes.object
};

export default AllCoursesTable;