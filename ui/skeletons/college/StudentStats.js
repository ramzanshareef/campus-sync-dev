const StudentStatsSkeleton = () => {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-5">Student Stats</h1>
            <div>
                <div
                    className="shadow-lg border bg-white w-fit rounded-2xl">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Total Students</h2>
                        <p className="text-3xl font-bold">
                            <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentStatsSkeleton;