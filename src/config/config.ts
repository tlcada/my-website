import { MockDataConfigType } from "../app/Helper/MockDataHelper";

type ConfigTypes = {
    readonly general: {
        readonly useBlackThemeAsDefault: boolean;
        readonly languages: {
            readonly fi: "fi",
            readonly en: "en"
        };
    };
    readonly linkedIn: {
        readonly url: string;
    };
    readonly services: {
        readonly mailService: {
            readonly url: string;
        };
    };
    readonly mockData: MockDataConfigType;
}

const mockDataOn = process.env.REACT_APP_MOCK_DATA_ON === "true";

const config: ConfigTypes = {
    general: {
        useBlackThemeAsDefault: true,
        languages: {
            fi: "fi",
            en: "en"
        }
    },
    linkedIn: {
        url: "https://www.linkedin.com/in/petteriaho/",
    },
    services: {
        mailService: {
            url: "server"
        }
    },
    mockData: {
        slowConnection: {
            waitMs: 500
        },
        mailService: {
            sendEmail: {
                useErrorResponse: false,
                mockDataOn: mockDataOn
            }
        },
        auth: {
            login: {
                useErrorResponse: false,
                mockDataOn: mockDataOn
            }
        }
    }
};

export default config;
