import BreadCumbs from "@/ui/components/BreadCumbs";
import FacultyDashboardTopBar from "@/ui/faculty/sidebar/Topbar";
import Sidebar from "@/ui/faculty/sidebar/sidebarComp";
import PropTypes from "prop-types";


export default function DashboardLayout({ children }) {
    return (
        <>
            <div className="flex flex-row max-h-screen">
                <Sidebar />
                <div className="w-full flex flex-col">
                    <FacultyDashboardTopBar />
                    <BreadCumbs />
                    <div className="py-5 px-7 overflow-y-scroll scrollbar-hide">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};