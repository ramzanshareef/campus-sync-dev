export const AllCoursesOfStudentHomePageSkeleton = () => {
    return (
        <div className="w-full max-md:mx-auto mx-6 flex flex-wrap max-md:justify-around">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="p-4 min-w-fit">
                    <div className="h-full border-2 border-gray-400 border-opacity-60 rounded-2xl overflow-hidden cursor-pointer">
                        <div className="animate-pulse bg-gray-300 h-48 md:h-36 w-96 md:w-80 object-cover object-center"></div>
                        <div className="px-6 py-4 flex flex-row justify-between">
                            <div className="title-font text-lg font-medium text-gray-900 bg-gray-300 h-6 w-3/4 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};