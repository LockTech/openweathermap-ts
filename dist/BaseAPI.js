import { SCHEME, API_HOST } from './helpers/index.js';
class BaseAPI {
    constructor({ apiKey, units = 'imperial', language = 'en' }) {
        this.settings = {
            apiKey,
            units,
            language
        };
        this.BASE_URL = SCHEME + API_HOST;
    }
    // ***
    // ***
    // Setters
    // ***
    // ***
    setApiKey(apiKey) {
        this.settings.apiKey = apiKey;
    }
    setUnits(units) {
        this.settings.units = units;
    }
    setLanguage(language) {
        this.settings.language = language;
    }
    clearSettings() {
        this.settings = {
            apiKey: 'youNeedValidApiKey',
            units: 'imperial',
            language: 'en'
        };
    }
    // ***
    // ***
    // Getters
    // ***
    // ***
    getAllSettings() {
        return this.settings;
    }
    // ***
    // ***
    // Private
    // ***
    // ***
    buildURL(queryType, query) {
        const { BASE_URL, settings } = this;
        return `${BASE_URL + queryType}?${query}&appid=${settings.apiKey}&units=${settings.units}&lang=${settings.language}`;
    }
}
export default BaseAPI;
