import { getCollegeDetails } from "@/actions/college/profile";
import AddFacultyComp from "@/ui/college/faculty/AddFaculty";

export default async function AddFaculty() {
    let data = await getCollegeDetails();
    return (
        <>
            <AddFacultyComp
                college={data?.user}
            />
        </>
    );
}