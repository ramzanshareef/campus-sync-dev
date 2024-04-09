"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitButton } from "./SubmitButton";
import Image from "next/image";
import { useFormState } from "react-dom";
import { userSignup } from "@/actions/user/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const SignUpForm = () => {
    const [state, submitAction] = useFormState(userSignup, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.status !== 200) {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("singupForm").reset();
                },
            });
        }
        else if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("singupForm").reset();
                    router.replace("/login");
                },
            });
        }
    }, [state]);


    return (
        <>
            <div className="min-h-screen flex items-center justify-center m-0 p-0">
                <div className="hidden sm:flex sm:w-1/2">
                    <img
                        src="/auth-page-side.png"
                        alt="Demo Image"
                        className="object-cover max-w-full min-h-screen "
                    />
                </div>
                <div className="min-h-screen w-full sm:w-1/2">
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                            <Image src="/logo.svg" alt="logo" height={10} width={10}
                                style={{ width: "8rem" }}
                                priority={true}
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up for an Account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action={submitAction} className="space-y-8" id="singupForm">
                                <div>
                                    <div className="mt-2 relative">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            minLength={3}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50 peer placeholder-transparent"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute block left-0 -top-7 text-sm font-medium leading-6 text-gray-900 peer-placeholder-shown:hidden transition-all"
                                        >
                                            Name
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2 relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email address"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50 peer placeholder-transparent"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute block left-0 -top-7 text-sm font-medium leading-6 text-gray-900 peer-placeholder-shown:hidden transition-all"
                                        >
                                            Email address
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            minLength={6}
                                            placeholder="Password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50 peer placeholder-transparent"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute block left-0 -top-7 text-sm font-medium leading-6 text-gray-900 peer-placeholder-shown:hidden transition-all"
                                        >
                                            Password
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-4">
                                        <label
                                            htmlFor="userType"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Sign up as?
                                        </label>
                                        <select name="userType" id="userType"
                                            className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                            defaultValue={""}
                                        >
                                            <option value="">Select</option>
                                            <option value="student">Student</option>
                                            <option value="college">College</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <SubmitButton title="Sign up" size="full" />
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already have an account? &nbsp;
                                <Link href={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;