type UnhandledErrorResponseType = {
    readonly status: number; // example: 500
    readonly error: string; // example: "Internal Server Error"
    readonly message: string; // example: "Expected the discarded bits to be zero"
}

type FunctionParameters = {
    (): Promise<Response>;
};

export type GeneralResponseHandlerType = {
    errorResponse: GeneralErrorResponseType | null;
    successResponse: Response | null;
};

export type GeneralErrorResponseType = {
    readonly statusText: string;
    readonly message: string;
    readonly httpStatusCode: number | null;
}

export const unhandledErrorResponse = (message: string): UnhandledErrorResponseType => {
    return {
        status: 503,
        message: message,
        error: "Service Unavailable"
    };
};

export const generalResponseHandler = async (callRequest: FunctionParameters): Promise<GeneralResponseHandlerType> => {
    const responseOut: GeneralResponseHandlerType = { errorResponse: null, successResponse: null };

    try {
        const response: Response = await callRequest();
        if (response.ok) {
            responseOut.successResponse = response;
        } else {
            responseOut.errorResponse = {
                statusText: response.statusText,
                message: await response.text(),
                httpStatusCode: response.status,
            };
        }
    } catch(err: any) {
        responseOut.errorResponse = {
            statusText: "unknown",
            message: err.message,
            httpStatusCode: err.status || 500,
        };
    }

    return responseOut;
};
