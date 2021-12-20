import { development } from "../../environment/profile";
import config from "../../config/config";

type Options = {
    readonly ok: boolean;
    readonly status: number;
}

const initOptions: Options = {
    ok: true,
    status: 200
};

export default class MockDataHelper {

    private readonly condition: boolean;
    private readonly mockData: any;
    private readonly responseType: string;
    private readonly options: Options;

    constructor(condition: boolean, mockData: any, responseType: "text" | "json" | "arrayBuffer" | "blob" | "formData", options?: Options) {
        // This don't never allow using mock data in production
        this.condition = condition && development;
        this.mockData = mockData;
        this.responseType = responseType;
        if (!options) {
            this.options = (config.mockData.useErrorResponse) ? { ok: false, status: 500 } : initOptions;
        } else {
            this.options = options;
        }
    }

    public getCondition(): boolean {
        return this.condition;
    }

    public getMockData(): any {
        return this.mockData;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public buildMockDataResponse(mockData: any): Promise<Response> {
        const response: any = this.options;

        response[this.responseType] = function (): Promise<any> {
            return mockData ? Promise.resolve(mockData) : Promise.resolve();
        };

        return Promise.resolve(response);
    }
}
