import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
    showSidebar: false,
    setShowSidebar: (showSidebar) => set(() => {
        return { showSidebar };
    }),
});

export const useUserStore = create(
    devtools(
        persist(
            userStore,
            {
                name: "user-storage"
            }
        )
    )
);