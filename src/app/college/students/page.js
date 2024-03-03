import { AddStudentButton, ViewStudentsButton } from "@/ui/btn";
import StudentStats from "@/ui/college/students/StudentStats";
import StudentStatsSkeleton from "@/ui/skeletons/college/StudentStats";
import { Suspense } from "react";

export default async function CollegeStudents() {
    return (
        <>
            <Suspense fallback={<StudentStatsSkeleton />} >
                <StudentStats />
            </Suspense>
            <AddStudentButton />
            <ViewStudentsButton />
        </>
    );
}