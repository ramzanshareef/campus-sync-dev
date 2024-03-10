import { getFacultyDetails } from "@/actions/faculty/profile";
import Mainbar from "./Mainbar";
import ProfileCompBtnsGroup from "./ProfileCompBtnsGroup";
import ProfileTop from "./ProfileTop";



const FacultyProfileComp = async () => {
    let data = await getFacultyDetails();
    return (
        <>
            <ProfileTop />
            <ProfileCompBtnsGroup />
            <Mainbar
                faculty={data.user}
            />
        </>
    );
};

export default FacultyProfileComp;