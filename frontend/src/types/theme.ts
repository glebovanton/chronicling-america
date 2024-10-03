export const storageThemeKey = "theme";

// eslint-disable-next-line no-shadow
export enum Theme {
    Light = "light",
    Dark = "dark",
}

export interface ThemeState {
    appTheme: Theme | null
}
