type ConfigTypes = {
    general: {
        useBlackThemeAsDefault: boolean;
        languages: {
            fi: "fi",
            en: "en"
        };
    };
    linkedIn: {
      url: string;
    };
    services: {
        mailService: {
            url: string;
        }
    }
}

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
    }
};

export default config;
