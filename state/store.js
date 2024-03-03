import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
    resetStore: () => set(() => {
        return {
            showSidebar: false,
        };
    }),
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