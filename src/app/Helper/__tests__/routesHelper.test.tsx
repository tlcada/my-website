import { RoutesName } from "../routesHelper";

describe("routesHelper.ts", () => {

    it("RoutesName should return the right values", () => {
        expect(RoutesName.login).toEqual("login");
        expect(RoutesName.default).toEqual("/");
    });
});
