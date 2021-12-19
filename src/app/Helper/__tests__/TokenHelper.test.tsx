import TokenHelper, { darkThemeOnCookie } from "../TokenHelper";

describe("TokenHelper test", () => {

    it("should return the right values", () => {
        expect(darkThemeOnCookie.DARK_THEME_ON).toEqual("darkThemeOn");
    });

    it("cookies should be founded after they have been added", () => {
        TokenHelper.setCookie(darkThemeOnCookie.DARK_THEME_ON, "yes");
        expect(TokenHelper.getCookieByName(darkThemeOnCookie.DARK_THEME_ON)).toEqual("yes");
    });
});
