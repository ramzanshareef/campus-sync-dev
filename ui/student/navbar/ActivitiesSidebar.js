"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiContractLeftLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { AcademicsDropdown, ExamsDropdown, LibraryDropdown, OfficeDropdown, PlacementsDropdown, UtilitiesDropdown } from "./ActivitesDropdown";

const ActivitiesSidebar = ({ showSidebar, setShowSidebar }) => {
    const pathname = usePathname();

    return (
        <>
            <aside className={` absolute left-0 top-0 z-40 flex min-h-screen flex-col bg-white min-w-60 duration-300 ease-linear text-black font md:hidden
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-center py-4 gap-x-2 md:mr-6 max-md:justify-around">
                    <Link href="/college/dashboard">
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
                        href="/college/dashboard"
                        className="cursor-pointer text-2xl max-md:text-lg"
                    >
                        CampusSync
                    </Link>

                    <RiContractLeftLine
                        size={25}
                        onClick={() => setShowSidebar(false)}
                        className="text-3xl cursor-pointer border p-1 rounded-md md:hidden"
                    />

                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                {/* <!-- SIDEBAR CONTENT --> */}
                <nav className="flex-1 overflow-y-scroll scrollbar-hide z-50">
                    <ul className="px-4 py-2 ">
                        <li className={` rounded-md hover:bg-indigo-600 hover:rounded-md hover:text-white px-4 py-2 z-50 ${pathname.includes("/college/dashboard") ? "bg-indigo-700 rounded-md" : ""} `}>
                            <OfficeDropdown size="sm" />
                        </li>
                        <li className={`rounded-md hover:bg-indigo-600 hover:rounded-md hover:text-white px-4 py-2 z-50 ${pathname.includes("/college/dashboard") ? "bg-indigo-700 rounded-md" : ""} `}>
                            <AcademicsDropdown size="sm" />
                        </li>
                        <li className={`rounded-md hover:bg-indigo-600 hover:rounded-md hover:text-white px-4 py-2 z-50 ${pathname.includes("/college/dashboard") ? "bg-indigo-700 rounded-md" : ""} `}>
                            <ExamsDropdown size="sm" />
                        </li>
                        <li className={`rounded-md hover:bg-indigo-600 hover:rounded-md hover:text-white px-4 py-2 z-50 ${pathname.includes("/college/dashboard") ? "bg-indigo-700 rounded-md" : ""} `}>
                            <LibraryDropdown size="sm" />
                        </li>
                        <li className={`rounded-md hover:bg-indigo-600 hover:rounded-md hover:text-white px-4 py-2 z-50 ${pathname.includes("/college/dashboard") ? "bg-indigo-700 rounded-md" : ""} `}>
                            <PlacementsDropdown size="sm" />
                        </li>
                        <li className={`rounded-md hover:bg-indigo-600 hover:rounded-md hover:text-white px-4 py-2 z-50 ${pathname.includes("/college/dashboard") ? "bg-indigo-700 rounded-md" : ""} `}>
                            <UtilitiesDropdown size="sm" />
                        </li>
                    </ul>
                </nav>
                {/* <!-- SIDEBAR CONTENT --> */}

            </aside>
        </>
    );
};

export default ActivitiesSidebar;

ActivitiesSidebar.propTypes = {
    showSidebar: PropTypes.bool.isRequired,
    setShowSidebar: PropTypes.func.isRequired,
};