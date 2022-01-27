import { GeneralErrorResponseType, generalResponseHelper, GeneralResponseHelper } from "../../../Helper";
import MockDataHelper from "../../../Helper/MockDataHelper";
import config from "../../../../config/config";
import { post } from "../../../utils";

type Token = {
    readonly access_token: string;
    readonly sub: string;
}

export type User = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
}

const tokenMockData: Token = {
    access_token: "uh32i4gh23g5h978325g79u23g5",
    sub: "12345",
};

class AuthService {

    async login(username: string, password: string): Promise<User | never> {
        const tokenResponse: GeneralResponseHelper = await this.fetchToken(username, password);
        if (tokenResponse.successResponse) {
            const token: Token = await tokenResponse.successResponse.json();
            // TODO store token to local storage or cookies
            return this.fetchUser(token.access_token);
        } else {
            const error: GeneralErrorResponseType = tokenResponse.errorResponse as GeneralErrorResponseType;
            throw new Error(error.message);
        }
    }

    // TODO this is just an example and it always throws an error message
    private async fetchToken(username: string, password: string): Promise<GeneralResponseHelper> {
        return await generalResponseHelper(async () => {
            const mockData: MockDataHelper = new MockDataHelper(config.mockData.auth.login, tokenMockData, "json");
            const headers: Headers = new Headers({ "Accept": "application/json", "Content-Type": "application/json" });
            return post("https://example.com/api/v1/oauth/token", headers, JSON.stringify({ username, password, }), mockData);
        });
    }

    // TODO lazy example
    private fetchUser(accessToken: string): User {
        return {
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@gmail.com",
        };
    }
}

export default AuthService;
