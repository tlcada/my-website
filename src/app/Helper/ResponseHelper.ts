type FunctionParameters = {
    (): Promise<Response>;
};

export type GeneralResponseHelper = {
    errorResponse: GeneralErrorResponseType | null;
    successResponse: Response | null;
};

export type GeneralErrorResponseType = {
    readonly statusText: string;
    readonly message: string;
    readonly httpStatusCode: number | null;
}

export const unhandledErrorResponse = (message: string): {
    readonly status: number; // example: 500
    readonly error: string; // example: "Internal Server Error"
    readonly message: string; // example: "Expected the discarded bits to be zero"
} => {
    return {
        status: 503,
        message: message,
        error: "Service Unavailable"
    };
};

export const generalResponseHelper = async (callRequest: FunctionParameters): Promise<GeneralResponseHelper> => {
    const response: GeneralResponseHelper = { errorResponse: null, successResponse: null };

    try {
        const apiResponse: Response = await callRequest();
        if (apiResponse.ok) {
            response.successResponse = apiResponse;
        } else {
            response.errorResponse = {
                statusText: apiResponse.statusText,
                message: await apiResponse.text(),
                httpStatusCode: apiResponse.status,
            };
        }
    } catch(err: any) {
        response.errorResponse = {
            statusText: "unknown",
            message: err.message,
            httpStatusCode: err.status || 500,
        };
    }

    return response;
};
