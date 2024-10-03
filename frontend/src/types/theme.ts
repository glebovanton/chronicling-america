export const storageThemeKey = "theme";

export enum Theme {
    Light = "light",
    Dark = "dark",
}

export interface ThemeState {
    appTheme: Theme | null
}
