"use client";

import { usePathname, useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { FaUniversity } from "react-icons/fa";

const ProfileCompBtnsGroup = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="flex flex-row flex-wrap">
            <button
                className={`  py-2 px-4 rounded-md my-4 mr-2 flex gap-x-1 items-center
                ${pathname === "/faculty/profile" ? "bg-indigo-500 hover:bg-indigo-700 text-white" : "hover:text-indigo-600"}
                `}
                onClick={() => {
                    router.refresh();
                }}
            >
                <CiUser size={20} className="inline-flex stroke-1" />
                Profile
            </button>
            <button
                className={`py-2 px-4 rounded-md my-4 mr-2 flex gap-x-1 items-center 
                ${pathname === "/faculty" ? "bg-indigo-500 hover:bg-indigo-700 text-white" : "hover:text-indigo-600"}
                `}
                onClick={() => {
                    router.push("/faculty");
                }
                }
            >
                <FaUniversity size={20} className="inline-flex  " />
                College
            </button>

        </div>
    );
};

export default ProfileCompBtnsGroup;