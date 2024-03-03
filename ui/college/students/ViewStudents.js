import { getAllStudentDetails } from "@/actions/college/Students";
import PaginationBar from "@/ui/components/Pagination";

export default async function ViewAllStudents({ searchParams }) {
    let currentPage = Number(searchParams?.page || 1);
    const data = await getAllStudentDetails(currentPage);
    if (data.status !== 200) {
        return (
            <>
                <div>
                    Unable to fetch data!!!
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <table className="max-md:win-w-full md:w-5/6 mx-auto text-gray-900 overflow-x-auto" id="students">
                    <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                        <tr>
                            <th className="px-4 py-5 text-center">Roll No</th>
                            <th className="px-4 py-5 text-center">Name</th>
                            <th className="px-4 py-5 text-center">Branch</th>
                            <th className="px-4 py-5 text-center">Year (Semester)</th>
                            <th className="px-4 py-5 text-center">Email ID</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white overflow-x-auto">
                        {data?.students?.map((student, index) => (
                            <tr
                                key={index}
                                className="w-full border-b py-3 text-sm last-of-type:border-none
                                    
                                    hover:bg-gray-300 cursor-pointer
                                    transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                                    odd:bg-gray-100 even:bg-gray-200 
                                    [&:first-child>td:first-child]:rounded-tl-2xl 
                                    [&:first-child>td:last-child]:rounded-tr-2xl
                                    [&:last-child>td:first-child]:rounded-bl-2xl
                                    [&:last-child>td:last-child]:rounded-br-2xl
                                    "
                            >
                                <td className="py-3 pl-6 pr-3 text-center">
                                    {student.rollNo}
                                </td>
                                <td className="text-center px-4">
                                    {student.name}
                                </td>
                                <td className="text-center px-4">
                                    {student.department}
                                </td>
                                <td className="text-center px-4">
                                    {student.year} ({student.semester})
                                </td>
                                <td className="text-center px-4">
                                    {student.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationBar
                    itemsLength={data?.length || 0}
                    currentPage={currentPage}
                    tableID="students"
                />
            </>
        );
    }

}