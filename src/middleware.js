import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function middleware(request) {
    const protectedRoutes = ["/", "/chats"];
    const authRoutes = ["/login", "/signup"];
    const path = request.nextUrl.pathname;
    if (protectedRoutes.includes(path)) {
        if (!checkAuth()) {
            return NextResponse.redirect(new URL(`/login?redirectTo=${path}`, request.nextUrl.origin).toString());
        }
    }
    if (authRoutes.includes(path)) {
        if (checkAuth()) {
            return NextResponse.redirect(new URL("/", request.nextUrl.origin).toString());
        }
    }
    return NextResponse.next();

}

const checkAuth = () => {
    let token = cookies().get("userToken");
    if (token && token !== undefined && token !== null && token?.value !== "") {
        return true;
    }
    return false;
};