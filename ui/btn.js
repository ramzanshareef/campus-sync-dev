"use client";

import { decrease, increase, logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const DefaultButton = ({ title, className }) => {
    return (
        <button
            className={` bg-indigo-500 m-6 hover:bg-indigo-700 text-white py-1.5 px-3 rounded-md + ${className} `}
        >
            {title}
        </button>
    );
};

DefaultButton.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
};


export const Butoon = () => {
    return (
        <>
            <button
                className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={async (e) => {
                    e.preventDefault();
                    await increase();
                }}
            >
                View++
            </button>
            <button
                className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={async (e) => {
                    e.preventDefault();
                    await decrease();
                }}
            >
                View--
            </button>
        </>
    );
};

export const LogoutButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            onClick={async (e) => {
                e.preventDefault();
                await logout();
                toast.success("Logged out", {
                    position: "top-right",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        router.replace("/login");
                    },
                });
            }}
        >
            Logout
        </button>
    );
};

export const AddStudentButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md my-4 mr-2"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/college/students/add");
            }}
        >
            Add Students
        </button>
    );
};

export const ViewStudentsButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md my-4"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/college/students/view");
            }}
        >
            View All Students
        </button>
    );
};

export const AddFacultyButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md my-4 mr-2"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/college/faculty/add");
            }}
        >
            Add Faculty
        </button>
    );
};

export const ViewFacultyButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md my-4"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/college/faculty/view");
            }}
        >
            View All Faculty
        </button>
    );
};
