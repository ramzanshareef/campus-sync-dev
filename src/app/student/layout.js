import StudentNavbarComp from "@/ui/student/navbar/NavbarComp";
import PropTypes from "prop-types";


export default function DashboardLayout({ children }) {
    return (
        <>
            <div className="flex flex-row max-h-screen">
                <div className="w-full flex flex-col">
                    <StudentNavbarComp />
                    <div className="p-5 overflow-y-scroll scrollbar-hide mt-4">
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