import { getCourse } from "@/actions/faculty/Courses";
import { getAllStudents } from "@/actions/faculty/GetStudents";
import { EditCourseModal } from "@/ui/components/modals/EditCourse";

export default async function page({ searchParams}) {
    let data = (await getAllStudents())?.data;
    const students = data.map((student) => {
        return { value: student.id, label: student.name };
    });

    const data2 = await getCourse(searchParams.courseID);
    const course = data2?.course;
    if (data2?.status != 200) {
        return <h1>Course Not Found</h1>;
    }


    return (
        <>
            <EditCourseModal
                students={students}
                course={JSON.parse(JSON.stringify(course))}
            />

        </>
    );
}