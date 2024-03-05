import ViewAllFaculty from "@/ui/college/faculty/ViewFaculty";
import { ViewAllFacultyTableSkeleton } from "@/ui/skeletons/college/ViewStudentsTable";
import { Suspense } from "react";


export default async function ViewTotalFaculty({ searchParams }) {
    return (
        <>
            <Suspense fallback={<ViewAllFacultyTableSkeleton />}>
                <ViewAllFaculty searchParams={searchParams} />
            </Suspense>
        </>
    );
}