import Cookies, { CookieAttributes } from "js-cookie";

type DarkThemeOnCookieKey = {
    readonly DARK_THEME_ON: string;
}

export const darkThemeOnCookie: DarkThemeOnCookieKey = {
    DARK_THEME_ON: "darkThemeOn"
};

class TokenHelper {

    // Do not use Cookies.set(...) directly because then it is more difficulty to replace
    static setCookie(name: string, value: string, options?: CookieAttributes): void {
        Cookies.set(name, value, options);
    }

    // Do not use Cookies.get(...) directly because then it is more difficulty to replace
    static getCookieByName(cookieName: string): string | undefined {
        return Cookies.get(cookieName);
    }
}

export default TokenHelper;
