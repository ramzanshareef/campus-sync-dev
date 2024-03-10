import { getCollegeDetails } from "@/actions/college/profile";
import AddStudentComp from "@/ui/college/students/AddStudent";

export default async function AddStudent() {
    let data = await getCollegeDetails();
    return (
        <>
            <AddStudentComp
                college={data?.user}
            />
        </>
    );
}