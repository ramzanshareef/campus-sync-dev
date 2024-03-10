"use client";
import { usePathname } from "next/navigation";
import ProfileBox from "./ProfileBox";
import PropTypes from "prop-types";

export default function Mainbar({ college }) {
    const pathname = usePathname();
    return (
        <>
            {pathname === "/college/profile" && <ProfileBox
                college={college}
            />}
        </>
    );
}

Mainbar.propTypes = {
    college: PropTypes.object
};