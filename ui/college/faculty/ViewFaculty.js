import { getAllFacultyDetails } from "@/actions/college/Faculty";
import PaginationBar from "@/ui/components/Pagination";

export default async function ViewAllFaculty({ searchParams }) {
    let currentPage = Number(searchParams?.page || 1);
    const data = await getAllFacultyDetails(currentPage);
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
                <table className="max-md:win-w-full md:w-5/6 mx-auto text-gray-900 overflow-x-auto" id="faculties">
                    <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                        <tr>
                            <th className="px-4 py-5 text-center">Name</th>
                            <th className="px-4 py-5 text-center">Branch</th>
                            <th className="px-4 py-5 text-center">Roll No</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white overflow-x-auto">
                        {
                            data?.faculties?.length === 0 &&
                            <tr>
                                <td colSpan="5" className="text-center py-3">
                                    No Faculties found
                                </td>
                            </tr>
                        }
                        {data?.faculties?.map((faculty, index) => (
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
                                    {faculty.name}
                                </td>
                                <td className="text-center px-4">
                                    {faculty.department}
                                </td>
                                <td className="text-center px-4">
                                    {faculty.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationBar
                    itemsLength={data?.length || 0}
                    currentPage={currentPage}
                    tableID="faculties"
                />
            </>
        );
    }

}