import { getTotalStudentDetails } from "@/actions/college/Students";

export default async function StudentStats() {

    const { totalStudents } = await getTotalStudentDetails();

    return (
        <>
            <h1 className="text-3xl font-semibold mb-5">Student Stats</h1>
            <div>
                <div
                    className="shadow-lg border bg-white w-fit">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Total Students</h2>
                        <p className="text-3xl font-bold">{totalStudents}</p>
                    </div>
                </div>
            </div>
        </>
    );
}