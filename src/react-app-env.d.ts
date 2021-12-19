/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        REACT_APP_GA_CODE: string;
        REACT_APP_MOCK_DATA_ON: string | undefined;
    }
}
