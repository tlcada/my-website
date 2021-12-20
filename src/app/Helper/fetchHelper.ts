import MockDataHelper from "./MockDataHelper";
import config from "../../config/config";
import { unhandledErrorResponse } from "../Handler";
import { SnippetUtils } from "../utils";

export const post = async (url: string, headers: Headers, data: string, mockData: MockDataHelper): Promise<Response> | never => {
    return _fetch(mockData, url, {
        method: "POST",
        cache: "no-cache",
        headers: headers,
        body: data,
    });
};

async function _fetch(mockData: MockDataHelper, url: string, init: any): Promise<Response> {
    if (mockData) {
        if (mockData.getCondition()) {
            await SnippetUtils.sleep(config.mockData.slowConnection.waitMs);
            return mockData.buildMockDataResponse(mockData.getMockData());
        }
    }

    return fetch(url, init).then((response: Response) => {
        return response;
    }, (error: Error) => {
        // Comes here, for example, if the service does not respond
        throw unhandledErrorResponse(error.message);
    });
}

