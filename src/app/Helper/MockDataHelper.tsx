import { development } from "../../environment/profile";

type ResponseType = "text" | "json" | "arrayBuffer" | "blob" | "buffer";

type Options = {
    readonly ok: boolean;
    readonly status: number;
    headers: Headers;
    [key: string]: any;
}

export type MockDataConfigType = {
    readonly slowConnection: {
        readonly waitMs: number;
    };
    readonly mailService: {
        readonly sendEmail: MockDataApiOperation;
    };
    readonly auth: {
        readonly login: MockDataApiOperation;
    }
};

export type MockDataApiOperation = {
    readonly mockDataOn: boolean;
    readonly useErrorResponse: boolean;
};

/**
 * You can also replace this with Mocks Server.
 * For example: https://www.mocks-server.org/
 */
export default class MockDataHelper {

    private readonly enable: boolean;
    private readonly responseData: any;
    private readonly responseType: string;
    private readonly options: Options;

    constructor(operation: MockDataApiOperation, responseData: any, responseType: ResponseType) {
        this.enable = operation.mockDataOn;
        this.responseData = responseData;
        this.responseType = responseType;

        if (operation.useErrorResponse) {
            this.options = { ok: false, status: 500, headers: new Headers() };
        } else {
            this.options = { ok: true, status: 200, headers: new Headers() };
        }
    }

    public enableMockData(): boolean {
        // && development never allows mock response to be used in production
        // You can also add logic that tests can use mock data
        return this.enable && development;
    }

    public buildMockDataResponse(): Promise<Response> {
        const options: Options = this.options;
        const rawResponseData = this.responseData;

        options[this.responseType] = function (): Promise<any> {
            return rawResponseData ? Promise.resolve(rawResponseData) : Promise.resolve();
        };

        return Promise.resolve(options as any);
    }
}
