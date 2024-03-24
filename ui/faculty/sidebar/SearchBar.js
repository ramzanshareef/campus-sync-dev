"use client";

const SearchBar = () => {
    return (
        <>
            <input type="text" name="faculty-dashboard-home-search" id=""
                placeholder="Search for anything...."
                className="w-3/5 ml-8 max-md:w-full rounded-md text-black px-4 py-2 bg-gray-100
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />

        </>
    );
};

export default SearchBar;