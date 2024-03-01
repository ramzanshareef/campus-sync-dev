import { Butoon, LogoutButton } from "@/ui/btn";
import { getSession } from "../lib/session";

export default async function Home() {
    const session = await getSession();
    return (
        <>
            <h1>Welcome to the home page</h1>
            Total Views = {session.count || 0} and the user is a <i>{session.userType || "guest"}</i>
            <p
                className="text-lg text-red-600"
            >
                This is a simple example of a Next.js app with a custom layout.
            </p>
            <Butoon />
            <LogoutButton />
        </>
    );
}
