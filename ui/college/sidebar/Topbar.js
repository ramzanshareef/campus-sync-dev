import { isCollegeUser } from "@/actions/user/auth";
import UserDropdown from "./UserDropdown";
import SearchBar from "./SearchBar";

export default async function CollegeDashboardTopBar() {
    let isAuth = await isCollegeUser();
    let defUser = {
        name: "User",
        email: ""
    };
    if (isAuth.status === 200) {
        defUser = isAuth.user;
    }

    return (
        <>
            <div className="" >
                <div className="sticky w-full h-16 border-b border-b-gray-300 shadow-md mb-4 flex items-center px-10 justify-between">

                    <SearchBar />

                    <UserDropdown user={defUser} />
                </div>

            </div>
        </>
    );
}