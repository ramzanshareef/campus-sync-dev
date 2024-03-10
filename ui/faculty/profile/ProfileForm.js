"use client";

import { updateFacultyDetails, updateFacultyPassword } from "@/actions/faculty/profile";
import { SubmitButton } from "@/ui/user/SubmitButton";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { MdPersonalInjury } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = ({ faculty }) => {
    const [state, personalInfoUpdateHandler] = useFormState(updateFacultyDetails, null);
    const [passwordState, passwordUpdateHandler] = useFormState(updateFacultyPassword, null);

    useEffect(() => {
        if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("personalInfoUpdateForm")?.reset();
                },
            });
        }
        else {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("personalInfoUpdateForm").reset();
                },
            });
        }
    }, [state]);

    useEffect(() => {
        if (passwordState?.status === 200) {
            toast.success(passwordState?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("passwordUpdateForm")?.reset();
                },
            });
        }
        else {
            toast.error(passwordState?.message, {
                position: "top-right",
                autoClose: 1200,
                onClose: () => {
                    document.getElementById("passwordUpdateForm").reset();
                },
            });
        }
    }, [passwordState]);

    return (
        <>
            <div className="profile-box">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-row gap-x-2">
                        <h2 className="text-lg font-bold flex flex-row items-center gap-x-2">
                            <MdPersonalInjury className="text-2xl inline-flex" />
                            Personal Information
                        </h2>
                    </div>
                    <form
                        action={personalInfoUpdateHandler}
                        id="personalInfoUpdateForm"
                    >
                        <div className="flex flex-col space-y-4 max-md:text-sm">
                            <div className="flex flex-col space-y-1 md:space-y-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
                                    required={true}
                                    minLength={3}
                                    defaultValue={faculty?.name}
                                />
                            </div>
                            <div className="flex flex-col space-y-1 md:space-y-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="border border-gray-300 p-2 rounded w-full sm:w-1/2
                                    disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50
                                    "
                                    title="Email cannot be changed"
                                    required={true}
                                    defaultValue={faculty?.email}
                                    disabled={true}
                                />
                            </div>
                            <SubmitButton title="Update Info" size="fit" />
                        </div>
                    </form>
                    <div className="flex flex-row gap-x-2">
                        <h2 className="text-lg font-bold flex flex-row items-center gap-x-2">
                            <RiLockPasswordLine className="text-2xl inline-flex" />
                            Change Password
                        </h2>
                    </div>
                    <form
                        action={passwordUpdateHandler}
                        id="passwordUpdateForm"
                    >
                        <div className="flex flex-col space-y-4 max-md:text-sm">
                            <div className="flex flex-col space-y-1 md:space-y-2">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
                                    required={true}
                                    minLength={3}
                                />
                            </div>
                            <div className="flex flex-col space-y-1 md:space-y-2">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
                                    required={true}
                                    minLength={3}
                                />
                            </div>
                            <div className="flex flex-col space-y-1 md:space-y-2">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
                                    required={true}
                                    minLength={3}
                                />
                            </div>
                            <SubmitButton title="Update Password" size="fit" />
                        </div>
                    </form>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex voluptates consectetur odio quia, natus, velit nam alias porro quibusdam ad praesentium eos? Eos nemo sequi laudantium recusandae. Voluptatibus quis similique autem ratione? Dignissimos quisquam ea harum, provident repellendus maiores architecto a quasi ipsum, ad commodi exercitationem. Voluptate, odit esse. Nisi iste ex commodi autem laudantium harum iure vitae vero consequuntur officia, vel, accusamus voluptates reprehenderit dignissimos nostrum. Nihil illum inventore quod necessitatibus assumenda animi velit, dolores eos autem recusandae tenetur aut placeat similique, id harum optio excepturi adipisci, nisi sunt quas repellat tempora porro illo. Officia repellat vero quas dolore veniam sit quos, dignissimos libero debitis est optio quae sapiente, veritatis sed, assumenda ipsa obcaecati cupiditate non architecto mollitia totam magni laborum. Sint obcaecati dignissimos perspiciatis ut debitis, sapiente molestiae earum. Consequuntur eligendi delectus molestiae possimus in praesentium facilis. Repellendus eum explicabo vel laborum neque? Et corporis rem voluptate earum odio placeat totam id quos eius maiores, ipsum vitae adipisci excepturi, nemo porro aut architecto ratione amet molestias ducimus assumenda reiciendis! Quos atque cum, reiciendis explicabo eaque sint exercitationem, quasi soluta eius ea, culpa fugit. Ut, possimus ipsa architecto dolor placeat quo harum debitis recusandae autem hic soluta doloremque voluptas.
                    </p>
                </div>
            </div>
        </>
    );
};

ProfileForm.propTypes = {
    faculty: PropTypes.object
};

export default ProfileForm;