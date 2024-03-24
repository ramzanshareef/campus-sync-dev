"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RiContractLeftLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlinePlayLesson } from "react-icons/md";



export default function SidebarMain() {
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);

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

            {/* When The Sidebar is Open */}
            <aside className={` absolute left-0 top-0 z-40 flex flex-col h-screen border-r border-gray-200 bg-white overflow-y-hidden max-md:w-52 md:w-72 duration-300 ease-linear 
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center py-4 px-2 justify-between">
                    <div className="flex items-center gap-x-2">
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
                    </div>
                    <RiContractLeftLine
                        size={25}
                        onClick={() => setShowSidebar(false)}
                        className="cursor-pointer"
                    />

                </div>

                {/* <!-- SIDEBAR CONTENT --> */}
                <nav className="flex-1 scroll-auto overflow-y-scroll scrollbar-hide">
                    <ul className="py-2 overflow-y-hidden">
                        <li className={` border-l-4 border-l-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-l-indigo-600 px-4 py-2 ${pathname.includes("/faculty/dashboard") ? "text-indigo-600 border-l-indigo-500 bg-indigo-50" : "border-white"} `}>
                            <Link
                                href="/faculty/dashboard"
                                className="flex items-center gap-x-4">
                                <LuLayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className={` border-l-4 border-l-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-l-indigo-600 px-4 py-2 ${pathname.includes("/faculty/courses") ? "text-indigo-600 border-l-indigo-500 bg-indigo-50" : "border-white"} `}>
                            <Link
                                href="/faculty/courses"
                                className="flex items-center gap-x-4">
                                <MdOutlinePlayLesson size={18} />
                                <span>Courses</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* When The Sidebar is Closed */}
            <aside className={` absolute left-0 top-0 z-40 flex flex-col h-screen border-r border-gray-200 bg-white items-center max-w-fit duration-300 ease-linear gap-y-4 p-2 
            ${!showSidebar ? "translate-x-0" : "-translate-x-full"}
    `}>
                {/* HEADER */}
                <div className="flex flex-col items-center gap-y-4">
                    <Link href="#">
                        <Image
                            width={176}
                            height={32}
                            src={"/logo.svg"}
                            alt="Logo"
                            priority
                            quality={100}
                            className="cursor-pointer w-10 h-10"
                        />
                    </Link>
                    <GiHamburgerMenu
                        size={25}
                        onClick={() => setShowSidebar(true)}
                        className="cursor-pointer"
                    />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col items-center gap-y-4">
                    <Link
                        href="/faculty/dashboard"
                        title="Dashboard"
                        className={`flex items-center gap-x-4 
                        ${pathname.includes("/faculty/dashboard") ? "text-indigo-600" : "text-gray-600"}`}>
                        <LuLayoutDashboard size={25} />
                    </Link>
                    <Link
                        href="/faculty/courses"
                        title="Courses"
                        className={`flex items-center gap-x-4 
                        ${pathname.includes("/faculty/courses") ? "text-indigo-600" : "text-gray-600"}`}>
                        <MdOutlinePlayLesson size={25} />
                    </Link>
                </div>
            </aside >
        </>
    );
}