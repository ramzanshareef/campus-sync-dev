import { getAllStudents } from "@/actions/faculty/GetStudents";
import AddCourseForm from "@/ui/faculty/courses/AddCourseForm";

export default async function Page() {
    const data = await (await getAllStudents()).data;
    const students = data.map((student) => {
        return { value: student.id, label: student.name };
    });

    return (
        <>
            <AddCourseForm 
                students={students}
            />
        </>
    );
}