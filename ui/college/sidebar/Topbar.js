import { getSession } from "@/src/lib/session";
import { getUser } from "@/actions/user/auth";
import UserDropdown from "./UserDropdown";
import SearchBar from "./SearchBar";

export default async function CollegeDashboardTopBar() {
    const session = await getSession();
    const user = await (await getUser(session?.token))?.user;
    let defUser = {
        name: "User",
        email: ""
    };
    if (user) {
        defUser = user;
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