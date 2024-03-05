import { getTotalFacultyDetails } from "@/actions/college/Faculty";

export default async function FacultyStats() {

    const { totalFaculty } = await getTotalFacultyDetails();

    return (
        <>
            <h1 className="text-3xl font-semibold mb-5">Faculty Stats</h1>
            <div>
                <div
                    className="shadow-lg border bg-white w-fit rounded-2xl">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Total Faculty</h2>
                        <p className="text-3xl font-bold">{totalFaculty}</p>
                    </div>
                </div>
            </div>
        </>
    );
}