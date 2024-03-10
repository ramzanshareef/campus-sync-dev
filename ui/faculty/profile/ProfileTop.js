import { getFacultyDetails } from "@/actions/faculty/profile";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { FaUniversity } from "react-icons/fa";



const ProfileTop = async () => {
    let data = await getFacultyDetails();
    if (data.status !== 200) {
        return (
            <div className="text-center text-red-500">
                <h1>Error: {data.message}</h1>
            </div>
        );
    }
    else {
        return (
            <>
                <div className="p-0 rounded-lg shadow-xl overflow-hidden">
                    <div className="h-60 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 w-full">
                    </div>
                    <div className="-mt-8 ml-4 max-md:mx-auto w-32 h-32 rounded-md bg-white p-1">
                        <Image className="h-full w-full rounded-md" src="/logo.svg"
                            width={64} height={64} alt="College Profile" />
                    </div>
                    <div className="-mt-20 md:ml-40 max-md:mt-2 text-wrap text-gray-600 font-thin">
                        <h2 className="text-lg font-bold max-md:text-center max-md:px-2">
                            {data.user.name}
                        </h2>
                        <div className="flex flex-row flex-wrap max-md:justify-center gap-x-3 gap-y-4 mt-2 max-md:px-4 py-4">
                            <div className="flex items-center gap-x-2">
                                <FaUniversity className="inline-block" />
                                <span>
                                    {data.user?.college?.college}
                                </span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <SlCalender className="inline-block" />
                                <span>
                                    Joined 2024
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default ProfileTop;