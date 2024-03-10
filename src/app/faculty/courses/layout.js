import PropTypes from "prop-types";

export default function Layout({ children, editor }) {
    return (
        <>
            {children}
            {editor}
        </>
    );
}
Layout.propTypes = {
    children: PropTypes.node,
    editor: PropTypes.node
};