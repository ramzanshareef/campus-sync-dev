"use server";

import { getSession } from "@/src/lib/session";

export const increase = async () => {
    const session = await getSession();
    session.count = (session.count || 0) + 1;
    await session.save();
};

export const decrease = async () => {
    const session = await getSession();
    if (session.count === 0) {
        return;
    }
    session.count = (session.count || 0) - 1;
    await session.save();
};

export const logout = async () => {
    const session = await getSession();
    session.destroy();
};