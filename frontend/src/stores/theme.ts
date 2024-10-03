import { defineStore } from "pinia"

import { storageThemeKey, Theme, type ThemeState } from '@/types/theme'

export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => {
        return { appTheme: null }
    },
    actions: {
        initTheme() {
            const localTheme = window.localStorage.getItem(storageThemeKey) as Theme | null;

            if (localTheme) {
                this.setTheme(localTheme);

                return;
            }

            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.setTheme(Theme.Dark);
            }
        },
        setTheme(theme: Theme) {
            this.appTheme = theme;
        },
        toggleTheme() {
            this.setTheme( this.appTheme === Theme.Light ? Theme.Dark : Theme.Light);
        },
    },
})
