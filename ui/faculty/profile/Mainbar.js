"use client";
import { usePathname } from "next/navigation";
import ProfileBox from "./ProfileBox";
import PropTypes from "prop-types";

export default function Mainbar({ faculty }) {
    const pathname = usePathname();
    return (
        <>
            {pathname === "/faculty/profile" && <ProfileBox 
                faculty={faculty}
            />}
        </>
    );
}

Mainbar.propTypes = {
    faculty: PropTypes.object
};