"use client";

import Dropdown from "react-multilevel-dropdown";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { PiExam } from "react-icons/pi";
import { IoLibraryOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { VscTools } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import ActivitiesSidebar from "./ActivitiesSidebar";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";



export const OfficeDropdown = ({ size }) => {
    if (size === "sm") {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Office <HiOutlineOfficeBuilding
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName=""
                buttonVariant="special-success"
                wrapperClassName="min-w-full"
                className="min-w-full"

            >
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
                <Dropdown.Item className="gap-x-2 flex items-center group">
                    Profile
                    <IoIosArrowDown className="text-xs text-black group-hover:text-indigo-500" />
                    <Dropdown.Submenu position="bottom"

                    >
                        <Dropdown.Item>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                            View
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Office <HiOutlineOfficeBuilding
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName="hover:rounded-md shadow-md text-xs"
                buttonVariant="tertiary"
                wrapperClassName="border-r border-gray-500"

            >
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
                <Dropdown.Item
                    className="flex gap-x-2 items-center group"
                >
                    Profile
                    <MdOutlineArrowRight
                        className="text-lg text-black group-hover:text-indigo-500"
                    />
                    <Dropdown.Submenu position="right" >
                        <Dropdown.Item>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                            View
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
            </Dropdown>
        );
    }
};
export const AcademicsDropdown = ({ size }) => {
    const router = useRouter();
    if (size === "sm") {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Academics <HiOutlineAcademicCap
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName=""
                buttonVariant="special-success"
                wrapperClassName="min-w-full"
                className="min-w-full"
            >
                <Dropdown.Item
                    onClick={() => router.push("/student/courses/all")}
                >
                    My Courses
                </Dropdown.Item>
                <Dropdown.Item>
                    Academic Calendar
                </Dropdown.Item>
                <Dropdown.Item>
                    Class Time Table
                </Dropdown.Item>
                <Dropdown.Item>
                    List of Holidays
                </Dropdown.Item>
                <Dropdown.Item>
                    Course Selection
                </Dropdown.Item>
                <Dropdown.Item>
                    Sem Attendance
                </Dropdown.Item>
                <Dropdown.Item>
                    Event Attendance
                </Dropdown.Item>
                <Dropdown.Item>
                    Overall Attendance
                </Dropdown.Item>
                <Dropdown.Item>
                    Faculty Feedback
                </Dropdown.Item>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Academics <HiOutlineAcademicCap
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName="hover:rounded-md shadow-md text-xs"
                buttonVariant="tertiary"
                wrapperClassName="border-r border-gray-500"
            >
                <Dropdown.Item
                    onClick={() => router.push("/student/courses/all")}
                >
                    My Courses
                </Dropdown.Item>
                <Dropdown.Item>
                    Academic Calendar
                </Dropdown.Item>
                <Dropdown.Item>
                    Class Time Table
                </Dropdown.Item>
                <Dropdown.Item>
                    List of Holidays
                </Dropdown.Item>
                <Dropdown.Item>
                    Course Selection
                </Dropdown.Item>
                <Dropdown.Item>
                    Sem Attendance
                </Dropdown.Item>
                <Dropdown.Item>
                    Event Attendance
                </Dropdown.Item>
                <Dropdown.Item>
                    Overall Attendance
                </Dropdown.Item>
                <Dropdown.Item>
                    Faculty Feedback
                </Dropdown.Item>
            </Dropdown>
        );
    }
};
export const ExamsDropdown = ({ size }) => {
    if (size === "sm") {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Examination Cell <PiExam
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName=""
                buttonVariant="special-success"
                wrapperClassName="min-w-full"
                className="min-w-full"
            >
                <Dropdown.Item>
                    Notifications
                </Dropdown.Item>
                <Dropdown.Item>
                    Online Payments
                    <Dropdown.Submenu position="bottom" >
                        <Dropdown.Item>
                            Regular Fees
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Revalutaion Fees
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Supplementary Fees
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
                <Dropdown.Item>
                    Marks Details
                    <Dropdown.Submenu position="bottom" >
                        <Dropdown.Item>
                            Mid Marks
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Sem Wise Marks
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Overall Result
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
                <Dropdown.Item>
                    Hall Tickets
                    <Dropdown.Submenu position="bottom" >
                        <Dropdown.Item>
                            External Exams
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Internal Exams
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Examination Cell <PiExam
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName="hover:rounded-md shadow-md text-xs"
                buttonVariant="tertiary"
                wrapperClassName="border-r border-gray-500"
            >
                <Dropdown.Item>
                    Notifications
                </Dropdown.Item>
                <Dropdown.Item>
                    Online Payments
                    <Dropdown.Submenu position="right" >
                        <Dropdown.Item>
                            Regular Fees
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Revalutaion Fees
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Supplementary Fees
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
                <Dropdown.Item>
                    Marks Details
                    <Dropdown.Submenu position="right" >
                        <Dropdown.Item>
                            Mid Marks
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Sem Wise Marks
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Overall Result
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
                <Dropdown.Item>
                    Hall Tickets
                    <Dropdown.Submenu position="right" >
                        <Dropdown.Item>
                            External Exams
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Internal Exams
                        </Dropdown.Item>
                    </Dropdown.Submenu>
                </Dropdown.Item>
            </Dropdown>
        );
    }
};
export const LibraryDropdown = ({ size }) => {
    if (size === "sm") {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Library <IoLibraryOutline
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName=""
                buttonVariant="special-success"
                wrapperClassName="min-w-full"
                className="min-w-full"
            >
                <Dropdown.Item>
                    Read Books
                </Dropdown.Item>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Library <IoLibraryOutline
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName="hover:rounded-md shadow-md text-xs"
                buttonVariant="tertiary"
                wrapperClassName="border-r border-gray-500"
            >
                <Dropdown.Item>
                    Read Books
                </Dropdown.Item>
            </Dropdown>
        );
    }
};
export const PlacementsDropdown = ({ size }) => {
    if (size === "sm") {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Placements <IoIosPeople
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName=""
                buttonVariant="special-success"
                wrapperClassName="min-w-full"
                className="min-w-full"
            >
                <Dropdown.Item>
                    Announcements
                </Dropdown.Item>
                <Dropdown.Item>
                    Company Profiles
                </Dropdown.Item>
                <Dropdown.Item>
                    Placement Registrations
                </Dropdown.Item>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Placements <IoIosPeople
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName="hover:rounded-md shadow-md text-xs"
                buttonVariant="tertiary"
                wrapperClassName="border-r border-gray-500"
            >
                <Dropdown.Item>
                    Announcements
                </Dropdown.Item>
                <Dropdown.Item>
                    Company Profiles
                </Dropdown.Item>
                <Dropdown.Item>
                    Placement Registrations
                </Dropdown.Item>
            </Dropdown>
        );
    }
};
export const UtilitiesDropdown = ({ size }) => {
    if (size === "sm") {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Utilities <VscTools
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName=""
                buttonVariant="special-success"
                wrapperClassName="min-w-full"
                className="min-w-full"
            >
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown
                title={
                    <div className="flex items-center justify-center text-base max-md:flex-row-reverse max-md:justify-end gap-x-2">
                        Utilities <VscTools
                            className="text-xl"
                        />
                    </div>
                }
                position="right"
                menuClassName="hover:rounded-md shadow-md text-xs"
                buttonVariant="tertiary"

            >
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
            </Dropdown>
        );
    }
};

OfficeDropdown.propTypes = {
    size: PropTypes.string
};
AcademicsDropdown.propTypes = {
    size: PropTypes.string
};
ExamsDropdown.propTypes = {
    size: PropTypes.string
};
LibraryDropdown.propTypes = {
    size: PropTypes.string
};
PlacementsDropdown.propTypes = {
    size: PropTypes.string
};
UtilitiesDropdown.propTypes = {
    size: PropTypes.string
};




export default function StudentActivitiesDropdownBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <>
            <GiHamburgerMenu className="text-3xl cursor-pointer border p-1 rounded-md md:hidden"
                onClick={() => setShowSidebar(true)}
            />
            <ActivitiesSidebar showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />

            <div className="flex flex-row w-full items-center justify-center max-md:hidden">
                <OfficeDropdown size="lg" />
                <AcademicsDropdown size="lg" />
                <ExamsDropdown size="lg" />
                <LibraryDropdown size="lg" />
                <PlacementsDropdown size="lg" />
                <UtilitiesDropdown size="lg" />
            </div>
        </>
    );
}