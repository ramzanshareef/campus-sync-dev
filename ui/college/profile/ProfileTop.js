import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import PropTypes from "prop-types";


const ProfileTop = ({ college }) => {
    return (
        <>
            <div className="p-0 rounded-lg shadow-xl overflow-hidden">
                <div className="h-60 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 w-full">
                </div>
                <div className="-mt-8 ml-4 max-md:mx-auto w-32 h-32 rounded-md bg-white p-1">
                    <Image className="h-full w-full rounded-md" src="/cbit.jpg"
                        width={64} height={64} alt="College Profile" />
                </div>
                <div className="-mt-20 md:ml-40 max-md:mt-2 text-wrap text-gray-600 font-thin">
                    <h2 className="text-lg font-bold max-md:text-center max-md:px-2">
                        {
                            (college.college !== "N/A") ? college.college : <p className="text-red-600 animate-pulse">
                                😥 Please add your college name!
                            </p>
                        }
                    </h2>
                    <div className="flex flex-row flex-wrap max-md:justify-center gap-x-3 gap-y-4 mt-2 max-md:px-4 py-4">
                        <div className="flex items-center gap-x-2">
                            <CiLocationOn className="inline-block" />
                            <span>Hyderabad</span>
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
};

ProfileTop.propTypes = {
    college: PropTypes.object.isRequired,
};

export default ProfileTop;