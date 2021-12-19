import { development, Env, production, test } from "../profile";

describe("profile", () => {
    it("should match", () => {
        expect(test).toBeTruthy();
        expect(development).toBeFalsy();
        expect(production).toBeFalsy();
        expect(Env).toEqual("test");
    });
});
