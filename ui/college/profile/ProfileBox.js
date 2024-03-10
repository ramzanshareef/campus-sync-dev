import ProfileForm from "./ProfileForm";
import PropTypes from "prop-types";

const ProfileBox = ({ college }) => {
    return (
        <>
            <ProfileForm
                college={college}
            />
        </>
    );
};

ProfileBox.propTypes = {
    college: PropTypes.object
};

export default ProfileBox;