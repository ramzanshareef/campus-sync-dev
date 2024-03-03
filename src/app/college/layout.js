import BreadCumbs from "@/ui/components/BreadCumbs";
import CollegeDashboardTopBar from "@/ui/college/sidebar/Topbar";
import Sidebar from "@/ui/college/sidebar/sidebarComp";
import PropTypes from "prop-types";


export default function DashboardLayout({ children }) {
    return (
        <>
            <div className="flex flex-row max-h-screen">
                <Sidebar />
                <div className="w-full flex flex-col">
                    <CollegeDashboardTopBar />
                    <BreadCumbs />
                    <div className="p-5 overflow-y-scroll scrollbar-hide">
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