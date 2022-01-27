import { post } from "../apiUtils";
import { MockDataHelper } from "../../Helper";

const validPath = "https://reqres.in/api";
const invaliPath = "https://invalid_url/api";
const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: false, useErrorResponse: false }, null, "json");
const data = JSON.stringify({ name: "john" });

const headers: Headers = new Headers();
headers.set("Content-Type", "application/json");

describe("apiUtils.ts", () => {

    describe("post", () => {
        it("post should return single user with valid url", async () => {
            const response: Response = await post(`${validPath}/users`, headers, data, mockData);
            expect(response.ok).toBeTruthy();
            expect(response.status).toEqual(201);
            expect(await response.json()).toMatchObject({ "name": "john" });
        });

        it("post should return invalid response if the domain doesn't exist", async () => {
            // eslint-disable-next-line jest/no-conditional-expect
            await post(invaliPath, headers, data, mockData).catch(error => expect(error).toEqual({
                "error": "Service Unavailable",
                "message": "Network request failed",
                "status": 503
            }));
        });
    });
});
