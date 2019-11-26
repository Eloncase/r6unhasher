const baseUrl = "https://game-rainbow6.ubi.com/";

const jsonFiles = {
    ranks: {
        path: "data"
    },
    seasons: {
        path: "data"
    },
    operators: {
        path: "data"
    },
    weapons: {
        path: "data"
    },
    rewards: {
        path: "data"
    },
    locale: {
        path: "locales",
        localizible: true
    }
};

module.exports = {
    baseUrl: baseUrl,
    jsonFiles: jsonFiles
}