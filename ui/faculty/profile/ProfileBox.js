import ProfileForm from "./ProfileForm";
import PropTypes from "prop-types";

const ProfileBox = ({ faculty }) => {
    return (
        <>
            <ProfileForm
                faculty={faculty}
            />
        </>
    );
};

ProfileBox.propTypes = {
    faculty: PropTypes.object
};

export default ProfileBox;