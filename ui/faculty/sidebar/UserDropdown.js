"use client";

import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { LogoutButton } from "@/ui/btn";

const UserDropdown = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <>
            <div className="w-full flex justify-end items-center">
                <div
                    className="font-medium items-center gap-2.5 px-4 py-2.5 text-xs hidden md:inline-flex"
                >
                    <SlCalender size={12} />
                    {
                        new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                    }
                </div>
                <div
                    className="font-medium items-center gap-2.5 px-4 py-2.5 text-xs hidden md:inline-flex"
                >
                    <FaRegClock size={12} />
                    {
                        new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    }
                </div>
                <div>
                    <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white">
                        <IoNotificationsOutline size={20} />
                        <div className="relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-red-600 text-white border-2 border-white rounded-full -top-3 -left-3 dark:border-gray-900">20</div>
                    </button>

                </div>
                <div
                    ref={trigger}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-4 cursor-pointer border border-gray-600 rounded-xl p-0.5"
                    href={"#"}
                >
                    <span className="h-8 w-8 rounded-full ml-1">
                        <Image
                            width={112}
                            height={112}
                            src={"/logo.svg"}
                            style={{
                                width: "auto",
                                height: "auto",
                            }}
                            alt="User"
                            className="rounded-xl"
                        />
                    </span>
                    <span className="hidden text-right lg:block">
                        <span className="block text-sm font-medium">
                            {user?.name}
                        </span>
                    </span>
                    <MdKeyboardArrowDown size={20}
                        className={` ${dropdownOpen === true ? "hidden" : "block"}`}
                    />
                    <MdKeyboardArrowUp size={20}
                        className={` ${dropdownOpen === true ? "block" : "hidden"}`}
                    />
                </div>

                {/* <!-- Dropdown Start --> */}
                <div>
                    <div
                        ref={dropdown}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setDropdownOpen(false)}
                        className={`absolute right-0 mt-7 z-50 flex w-60 bg-gray-800 flex-col rounded-md ${dropdownOpen === true ? "block" : "hidden"}`}
                    >
                        <ul className="flex flex-col gap-5 border-b px-6 pt-7 bg-gray-800
                        last-of-type:border-b last-of-type:rounded-b-2xl last-of-type:border-b-gray-800 overflow-y-hidden
                        ">
                            <li className="hover:text-indigo-600">
                                <Link
                                    href="/college/profile"
                                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                >
                                    <CgProfile size={22} />
                                    My Profile
                                </Link>
                            </li>
                            <li className="hover:text-indigo-600">
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                >
                                    <IoSettingsOutline size={22} />
                                    Account Settings
                                </Link>
                            </li>
                            <LogoutButton />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

UserDropdown.PropTypes = {
    user: PropTypes.object.isRequired,
};


export default UserDropdown;