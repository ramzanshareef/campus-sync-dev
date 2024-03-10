/* eslint-disable react/prop-types */
"use client";

import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
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
            <div className="w-fit">
                <p
                    ref={trigger}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-4 cursor-pointer"
                >
                    <span className="hidden text-right md:block">
                        <span className="block text-sm font-medium text-black dark:text-white">
                            {user?.name}
                        </span>
                    </span>

                    <span className="h-12 w-12 rounded-full">
                        <Image
                            width={112}
                            height={112}
                            src={"/logo.svg"}
                            style={{
                                width: "auto",
                                height: "auto",
                            }}
                            alt="User"
                        />
                    </span>
                    <MdKeyboardArrowDown size={20}
                        className={`text-black dark:text-white ${dropdownOpen === true ? "hidden" : "block"}`}
                    />
                    <MdKeyboardArrowUp size={20}
                        className={`text-black dark:text-white ${dropdownOpen === true ? "block" : "hidden"}`}
                    />
                </p>

                {/* <!-- Dropdown Start --> */}
                <div
                    className=""
                >
                    <div
                        ref={dropdown}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setDropdownOpen(false)}
                        className={`absolute right-0 mt-2 z-50 flex w-60 bg-white flex-col rounded-md border shadow-default ${dropdownOpen === true ? "block" : "hidden"}`}
                    >
                        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7 dark:border-strokedark">
                            <li className="hover:text-indigo-600">
                                <Link
                                    href="/faculty/profile"
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
                        </ul>
                        <LogoutButton />
                    </div>
                </div>
            </div></>
    );
};

UserDropdown.PropTypes = {
    user: PropTypes.object,
};


export default UserDropdown;