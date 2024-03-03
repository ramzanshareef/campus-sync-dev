"use client";

import Link from "next/link";
import { SubmitButton } from "./SubmitButton";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "@/actions/user/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import PropTypes from "prop-types";

const LoginForm = (props) => {
    const [state, loginAction] = useFormState(userLogin, null);
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
                    document.getElementById("loginForm").reset();
                },
            });
        }
        else if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                    document.getElementById("loginForm").reset();
                    if (state?.userType === "student") {
                        router.replace(props.redirectTo || "/student/dashboard");
                    }
                    else if (state?.userType === "college") {
                        console.log("I am here" + state?.userType, props.redirectTo);
                        router.replace(props.redirectTo || "/college/dashboard");
                    }
                    else if (state?.userType === "admin") {
                        router.replace(props.redirectTo || "/admin/dashboard");
                    }
                    else {
                        toast.error("Invalid User Type", {
                            position: "top-right",
                            autoClose: 1800,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                },
            });
        }
    }, [state]);

    useEffect(() => {
        if (props.redirectTo && props.redirectTo !== "") {
            toast.error("You need to login to access the page", {
                position: "top-left",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [props.redirectTo]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="hidden sm:flex sm:w-1/2">
                    <img
                        src="/auth-page-side.png"
                        alt="Demo Image"
                        className="object-cover max-w-full min-h-screen"
                    />
                </div>
                <div className="min-h-screen w-full sm:w-1/2" id="form">
                    <div className="flex flex-col min-h-full justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                            <Image src="/logo.svg" alt="logo" height={10} width={10}
                                style={{ width: "8rem" }}
                                priority={true}
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your Account</h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action={loginAction} className="space-y-6" id="loginForm">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                        <div className="text-sm">
                                            <Link href={"/forgotpassword"} className="font-semibold text-indigo-600 hover:text-indigo-500" >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-4">
                                        <label htmlFor="userType" className="block text-sm font-medium leading-6 text-gray-900">Login as?</label>
                                        <input type="radio" name="userType" id="student" value="student" required title="Please Select User Type" />
                                        <label htmlFor="student"
                                            className="text-sm"
                                        >Student</label>
                                        <input type="radio" name="userType" id="college" value="college" required title="Please Select User Type" />
                                        <label htmlFor="college"
                                            className="text-sm"
                                        >College</label>
                                        <input type="radio" name="userType" id="admin" value="admin" required title="Please Select User Type" />
                                        <label htmlFor="admin"
                                            className="text-sm"
                                        >Admin</label>
                                    </div>
                                </div>
                                <div>
                                    <SubmitButton title="Log in" size="full"
                                        variant="primary"
                                    />
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Donot have an acccount? &nbsp;
                                <Link href={"/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" >
                                    Sign up now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginForm;

LoginForm.propTypes = {
    redirectTo: PropTypes.string,
};