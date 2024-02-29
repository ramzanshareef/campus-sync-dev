import LoginForm from "@/ui/user/LoginForm";

export default async function loginPage({ searchParams }) {
    return (
        <>
            <LoginForm redirectTo={searchParams.redirectTo}  />
        </>
    );
}