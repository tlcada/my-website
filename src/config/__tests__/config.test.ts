import config from "../config";

describe("config", () => {
    it("config file settings should match", () => {
        const expectedResult = {
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
            }
        };

        expect(expectedResult).toEqual(expect.objectContaining(config));
    });
});
