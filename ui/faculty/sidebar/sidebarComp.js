"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/state/store";
import { RiContractLeftLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlinePlayLesson } from "react-icons/md";
import { usePathname } from "next/navigation";



const Sidebar = () => {
    const userStore = useUserStore();
    let { showSidebar, setShowSidebar } = userStore;
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const pathname = usePathname();

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !showSidebar ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setShowSidebar(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }) => {
            if (!showSidebar || key !== "Escape") return;
            setShowSidebar(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <>

            <aside className={` absolute left-0 top-0 z-40 flex h-screen flex-col overflow-y-hidden bg-[#1C2434] w-72 duration-300 ease-linear text-white font 
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-between pl-4 py-4 gap-x-2 md:mr-6 max-md:justify-around">
                    <Link href="/">
                        <Image
                            width={176}
                            height={32}
                            src={"/logo.svg"}
                            alt="Logo"
                            priority
                            quality={100}
                            className="cursor-pointer w-12 h-12 max-md:w-6 max-md:h-6"
                        />
                    </Link>
                    <Link
                        href="/"
                        className="cursor-pointer text-2xl max-md:text-lg"
                    >
                        CampusSync
                    </Link>

                    <RiContractLeftLine
                        size={25}
                        onClick={() => setShowSidebar(false)}
                        className="cursor-pointer"
                    />

                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                {/* <!-- SIDEBAR CONTENT --> */}
                <nav className="flex-1 scroll-auto overflow-y-scroll scrollbar-hide">
                    <ul className="px-4 py-2">
                        <li className={` hover:bg-gray-700 hover:rounded-md px-4 py-2 ${pathname.includes("/faculty/dashboard") ? "bg-gray-700 rounded-md" : ""} `}>
                            <Link href="/faculty/dashboard" className="flex items-center gap-x-4">
                                <LuLayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className={` hover:bg-gray-700 hover:rounded-md px-4 py-2 ${pathname.includes("/faculty/courses") ? "bg-gray-700 rounded-md" : ""} `}>
                            <Link href="/faculty/courses" className="flex items-center gap-x-4">
                                <MdOutlinePlayLesson size={18} />
                                <span>Course</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* <!-- SIDEBAR CONTENT --> */}

            </aside>


        </>
    );
};


export default Sidebar;