/* eslint-disable indent */
import { NextResponse } from "next/server";
import { getSession } from "./lib/session";


export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicRoutes = ["/"];
    const authRoutes = ["/login", "/signup"];

    let isAuth = await checkAuth();
    let userType = await checkUserType();


    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }
    if (authRoutes.includes(path)) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/", request.nextUrl.origin).toString());
        }
        return NextResponse.next();
    }

    if (path.startsWith("/college") && userType !== "college") {
        return NextResponse.redirect(new URL("/login?redirectTo=" + request.nextUrl.pathname, request.nextUrl.origin).toString());
    }
    if (path.startsWith("/faculty") && userType !== "faculty") {
        return NextResponse.redirect(new URL("/login?redirectTo=" + request.nextUrl.pathname, request.nextUrl.origin).toString());
    }
    if (path.startsWith("/student") && userType !== "student") {
        return NextResponse.redirect(new URL("/login?redirectTo=" + request.nextUrl.pathname, request.nextUrl.origin).toString());
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