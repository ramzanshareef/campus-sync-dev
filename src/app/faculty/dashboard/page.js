import FacultyDashboardMain from "@/ui/faculty/dashboard/main";
import { isFacultyUser } from "@/actions/user/auth";

export default async function FacultyDashboard() {
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
            <FacultyDashboardMain
                user={defUser}
            />
        </>
    );
}