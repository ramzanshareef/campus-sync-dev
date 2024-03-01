"use client";

import { decrease, increase, logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Butoon = () => {
    return (
        <>
            <button
                className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={async (e) => {
                    e.preventDefault();
                    await increase();
                }}
            >
                View++
            </button>
            <button
                className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
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
            className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
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