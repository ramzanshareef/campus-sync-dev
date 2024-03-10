"use client";

import Image from "next/image";
import PropTypes from "prop-types";
import { PiStudent } from "react-icons/pi";
import { FcDepartment } from "react-icons/fc";


const GeneralInfo = ({ course }) => {
    return (
        <>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                <Image
                    src={course.image}
                    alt="Course Image"
                    width={500}
                    height={300}
                    className="w-full md:w-1/2 block rounded"
                />
                <div className="w-2/5 max-md:w-full">
                    <div>
                        <h2 className="text-2xl h-fit border-b border-b-gray-500 w-full mb-4 pb-2">
                            Course Details
                        </h2>
                        <table
                            className="w-full"
                        >
                            <tbody>
                                <tr
                                    className="px-6 py-3 bg-gray-100 text-gray-900 w-full h-fit flex items-center max-md:gap-x-4  rounded-tl-md rounded-tr-md"
                                >
                                    <td className="w-1/2 h-fit flex items-center">
                                        <FcDepartment className="text-2xl inline-flex mr-4" />
                                        Department
                                    </td>
                                    <td className="w-1/2 h-fit flex items-center">
                                        <span className="text-gray-700">
                                            {course.department}
                                        </span>
                                    </td>
                                </tr>
                                <tr
                                    className="px-6 py-3 bg-gray-200 text-gray-900 w-full h-fit flex items-center max-md:gap-x-4"
                                >
                                    <td className="rounded-tl-md rounded-tr-md w-1/2 h-fit flex items-center">
                                        <PiStudent className="text-2xl inline-flex mr-4 text-indigo-600" />
                                        No. of Students
                                    </td>
                                    <td className="rounded-tl-md rounded-tr-md w-1/2 h-fit flex items-center">
                                        <span className="text-gray-700">
                                            {course.students.length}
                                        </span>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-2xl h-fit border-b border-b-gray-500 w-full pb-2">
                    Description
                </h2>
                <p className="text-gray-700 mt-4">{course.description} &nbsp;
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A, commodi iure! Tempore optio obcaecati aperiam animi. Nihil deserunt assumenda veritatis exercitationem fugit voluptatibus quis vero, natus, cupiditate, dolore aspernatur asperiores. Corrupti, incidunt necessitatibus expedita harum nostrum non cum sapiente esse accusantium ad in totam dolorum id, voluptatum ducimus officia molestiae iste hic doloremque tenetur quibusdam eligendi et rem enim! Obcaecati.
                </p>
            </div>
        </>
    );
};

GeneralInfo.propTypes = {
    course: PropTypes.object
};

export default GeneralInfo;