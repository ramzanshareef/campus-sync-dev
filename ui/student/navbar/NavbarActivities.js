import ActivitesDropdown from "./ActivitesDropdown";

export default async function StudentNavbarActivities() {
    return (
        <>
            <div className="w-full h-16 border-b border-b-gray-300 shadow-md mb-4 flex items-center px-4">
                <ActivitesDropdown />
            </div>
        </>
    );
}