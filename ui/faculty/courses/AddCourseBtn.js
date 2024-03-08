"use client";

import { useRouter } from "next/navigation";


const AddCourseBtn = () => {
    const router = useRouter();
    return (
        <>
            <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                onClick={() => {
                    router.push("/faculty/courses/add");
                }}
            >
                + Add New Course
            </button>
        </>
    );
};

export default AddCourseBtn;