
// eslint-disable-next-line react/prop-types
export default function Layout({ children, editor }) {
    return (
        <>
            {children}
            {editor}
        </>
    );
}