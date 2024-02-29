import { NextResponse } from "next/server";
import { getSession } from "./lib/session";


export async function middleware(request) {
    const protectedRoutes = ["/home"];
    const authRoutes = ["/login", "/signup"];
    const path = request.nextUrl.pathname;
    let isAuth = await checkAuth();


    if (protectedRoutes.includes(path)) {
        if (!isAuth) {
            return NextResponse.redirect(new URL(`/login?redirectTo=${path}`, request.nextUrl.origin).toString());
        }
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