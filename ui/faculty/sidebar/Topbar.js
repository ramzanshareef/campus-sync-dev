import { isFacultyUser } from "@/actions/user/auth";
import UserDropdown from "./UserDropdown";
import SearchBar from "./SearchBar";

export default async function FacultyDashboardTopBar() {
    let isAuth = await isFacultyUser();
    let defUser = {
        name: "User",
        email: ""
    };
    if (isAuth.status === 200) {
        defUser = isAuth.user;
    }

    return (
        <>
            <div className="sticky w-full h-20 flex items-center px-10 justify-between bg-gray-900 text-white">
                <SearchBar />
                <UserDropdown user={defUser} />
            </div>
        </>
    );
}