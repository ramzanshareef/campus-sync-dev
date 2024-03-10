import { getCollegeDetails } from "@/actions/college/profile";
import ProfileCompBtnsGroup from "./ProfileCompBtnsGroup";
import ProfileTop from "./ProfileTop";
import Mainbar from "./MainBar";


const CollegeProfileComp = async () => {
    let data = await getCollegeDetails();
    let college = data?.user;
    if (data.status !== 200) {
        return <h1>{data.message}</h1>;
    }
    else {
        return (
            <>
                <ProfileTop
                    college={college}
                />
                <ProfileCompBtnsGroup />
                <Mainbar 
                    college={college}
                />
            </>
        );
    }
};

export default CollegeProfileComp;