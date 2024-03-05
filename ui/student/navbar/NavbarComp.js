import { getSession } from "@/src/lib/session";
import { getUser } from "@/actions/user/auth";
import StudentDropdown from "./StudentDropDown";
import StudentNavbarActivities from "./NavbarActivities";
import Image from "next/image";
import Link from "next/link";
// import UserDropdown from "./UserDropdown";
// import SearchBar from "./SearchBar";

export default async function StudentNavbarComp() {
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
                <div className="sticky w-full h-16 border-b border-b-gray-300 shadow-md -mb-1 flex items-center px-10 justify-between bg-indigo-500 ">
                    <Link className="text-lg md:text-2xl text-white italic flex flex-row items-center justify-center gap-x-2"
                        href={"/"}>
                        <Image
                            src="/logo.svg"
                            alt="Campus Sync"
                            width={40}
                            height={40}
                        />
                        Campus Sync
                    </Link>
                    <StudentDropdown user={defUser} />
                </div>
                <StudentNavbarActivities />
            </div>
        </>
    );
}