"use client";

import { useUserStore } from "@/state/store";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";


const SearchBar = () => {
    const userStore = useUserStore();
    let { showSidebar, setShowSidebar } = userStore;
    return (
        <>
            <div className="w-4/5 flex gap-x-2 items-center max-md:text-sm">
                <GiHamburgerMenu
                    size={25}
                    className="text-gray-600 cursor-pointer lg:hidden float-left"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSidebar(!showSidebar);
                    }}
                />
                <IoIosSearch
                    size={25}
                    className="text-gray-600 float-left"
                />
                <input type="text" name="college-dashboard-home-search" id=""
                    placeholder="Search for anything...."
                    className="w-1/2 h-12 rounded-md pl-4"
                />
            </div>

        </>
    );
};

export default SearchBar;