import { NextResponse } from "next/server";
import { getSession } from "./lib/session";


export async function middleware(request) {
    const userTypeRoutes = {
        student: ["/"],
        college: /^\/college/,
        faculty: ["/faculty"],
        admin: ["/admin"],
    };

    const publicRoutes = ["/"];
    const authRoutes = ["/login", "/signup"];
    const path = request.nextUrl.pathname;

    let isAuth = await checkAuth();
    let userType = await checkUserType();


    if (userTypeRoutes[userType] && path.match(userTypeRoutes[userType])) {
        if (!isAuth && userType !== "guest") {
            return NextResponse.redirect(new URL(`/login?redirectTo=${path}`, request.nextUrl.origin).toString());
        }
    }

    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }

    if (authRoutes.includes(path)) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/", request.nextUrl.origin).toString());
        }
    }
    return NextResponse.next();

}

const checkAuth = async () => {
    const session = await getSession();
    if (!session || session.isAuth === undefined) {
        return false;
    }
    return session.isAuth;
};

const checkUserType = async () => {
    const session = await getSession();
    if (!session || session.userType === undefined) {
        return "guest";
    }
    return session.userType;
};