import { AddStudentButton, ViewStudentsButton } from "@/ui/btn";
import StudentStats from "@/ui/college/students/StudentStats";

export default async function CollegeStudents() {
    return (
        <>
            <StudentStats />
            <AddStudentButton />
            <ViewStudentsButton />
        </>
    );
}