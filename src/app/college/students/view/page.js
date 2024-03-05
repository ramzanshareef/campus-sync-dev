import ViewAllStudents from "@/ui/college/students/ViewStudents";
import { ViewAllStudentsTableSkeleton } from "@/ui/skeletons/college/ViewStudentsTable";
import { Suspense } from "react";


export default async function ViewTotalStudent({ searchParams }) {
    return (
        <>
            <Suspense fallback={<ViewAllStudentsTableSkeleton />}>
                <ViewAllStudents searchParams={searchParams} />
            </Suspense>
        </>
    );
}