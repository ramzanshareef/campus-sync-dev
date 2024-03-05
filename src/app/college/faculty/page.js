import { AddFacultyButton, ViewFacultyButton } from "@/ui/btn";
import FacultyStats from "@/ui/college/faculty/FacultyStats";
import FacultyStatsSkeleton from "@/ui/skeletons/college/FacultyStats";
import { Suspense } from "react";

export default async function CollegeFaculty() {
    return (
        <>
            <Suspense fallback={<FacultyStatsSkeleton/>} >
                <FacultyStats />
            </Suspense>
            <AddFacultyButton />
            <ViewFacultyButton />
        </>
    );
}