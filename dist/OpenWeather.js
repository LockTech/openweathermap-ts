import { WEATHER_API_VERSION, WEATHER_API_NAME } from './helpers/index.js';
import BaseAPI from './BaseAPI.js';
import Geocoding from './geocoding/Geocoding.js';
class OpenWeather extends BaseAPI {
    constructor({ apiKey, units = 'imperial', language = 'en' }) {
        super({
            apiKey,
            units,
            language
        });
        this.BASE_URL += WEATHER_API_NAME + WEATHER_API_VERSION;
        this.location = {
            city: {},
            cityId: undefined,
            geoCoordinates: {},
            zipcode: {}
        };
        this.geocoding = new Geocoding({ apiKey, units, language });
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
    setCityName({ cityName, state, countryCode }) {
        this.location.city = {
            ...this.location.city,
            cityName,
            state,
            countryCode
        };
    }
    setCityId(cityId) {
        this.location.cityId = cityId;
    }
    setGeoCoordinates(latitude, longitude) {
        this.location.geoCoordinates = {
            ...this.location.geoCoordinates,
            latitude,
            longitude
        };
    }
    setZipCode(zipcode, countryCode) {
        this.location.zipcode = {
            ...this.location.zipcode,
            zipcode,
            countryCode
        };
    }
    clearSettings() {
        this.settings = {
            apiKey: 'youNeedValidApiKey',
            units: 'imperial',
            language: 'en'
        };
    }
    clearLocation() {
        this.location = {
            city: {},
            cityId: undefined,
            geoCoordinates: {},
            zipcode: {}
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
    getAllLocations() {
        return this.location;
    }
    // ***
    // ***
    // Parent Getters
    // ***
    // ***
    /**
     * @summary Use the built-in API to get by city name (deprecated, but still useable)
     * @deprecated  Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality. Please use Geocoder API if you need automatic convert city names and zip-codes to corrdinates vice versa. (https://openweathermap.org/forecast5#builtin)
     */
    builtInGetByCityName({ location, queryType }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!location?.cityName && !this.location.city.cityName) {
                    throw new Error(`cityName missing, please pass it via argument or set it using setCityName method`);
                }
                const cityName = location?.cityName || this.location.city.cityName;
                const state = location?.state || this.location.city.state;
                const countryCode = location?.countryCode || this.location.city.countryCode;
                const query = `q=${cityName}${state ? ',' + state : ''}${countryCode ? ',' + countryCode : ''}`;
                const request = this.buildURL(queryType, query);
                const response = await fetch(request);
                const currentWeather = await response.json();
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * @summary Uses the Geocoding API to first get the coordinates of the city name, then uses the coordinates to get the weather data.
     */
    getByCityName({ location, queryType }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!location?.cityName && !this.location.city.cityName) {
                    throw new Error(`cityName missing, please pass it via argument or set it using setCityName method`);
                }
                const cityName = location?.cityName || this.location.city.cityName;
                const state = location?.state || this.location.city.state;
                const countryCode = location?.countryCode || this.location.city.countryCode;
                const coordinates = await this.geocoding.getGeoCoordinatesByLocationName(cityName, countryCode, state);
                const { lat: latitude, lon: longitude } = coordinates[0];
                const currentWeather = this.getByGeoCoordinates({ latitude, longitude, queryType });
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     *
     * @deprecated  Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality. Please use Geocoder API if you need automatic convert city names and zip-codes to corrdinates vice versa. (https://openweathermap.org/forecast5#builtin)
     */
    getByCityId({ cityId, queryType }) {
        return new Promise(async (resolve, reject) => {
            try {
                const { location } = this;
                if (!cityId && !location.cityId) {
                    throw new Error(`cityId missing, please pass it via argument or set it using setCityId method`);
                }
                cityId = cityId || location.cityId;
                const query = `id=${cityId}`;
                const request = this.buildURL(queryType, query);
                const response = await fetch(request);
                const currentWeather = await response.json();
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getByGeoCoordinates({ latitude, longitude, queryType }) {
        return new Promise(async (resolve, reject) => {
            try {
                if ((!latitude || !longitude) &&
                    (!this.location.geoCoordinates.latitude ||
                        !this.location.geoCoordinates.longitude)) {
                    throw new Error(`latitude or longitude missing, please pass it via argument or set it using setGeoCoordinates method`);
                }
                latitude = latitude || this.location.geoCoordinates.latitude;
                longitude = longitude || this.location.geoCoordinates.longitude;
                const query = `lat=${latitude}&lon=${longitude}`;
                const request = this.buildURL(queryType, query);
                const response = await fetch(request);
                const currentWeather = await response.json();
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
   *
   * @deprecated  Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality. Please use Geocoder API if you need automatic convert city names and zip-codes to corrdinates vice versa. (https://openweathermap.org/forecast5#builtin)
   */
    builtInGetByZipcode(zipcode, queryType, countryCode) {
        return new Promise(async (resolve, reject) => {
            try {
                const { location } = this;
                if (!zipcode && !location.zipcode.zipcode) {
                    throw new Error(`zipcode missing, please pass it via argument or set it using setZipcode method`);
                }
                zipcode = zipcode || location.zipcode.zipcode;
                const query = `zip=${zipcode}${countryCode ? ',' + countryCode : ''}`;
                const request = this.buildURL(queryType, query);
                const response = await fetch(request);
                const currentWeather = await response.json();
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getByZipcode(zipcode, queryType, countryCode) {
        return new Promise(async (resolve, reject) => {
            try {
                const { location } = this;
                if (!zipcode && !location.zipcode.zipcode) {
                    throw new Error(`zipcode missing, please pass it via argument or set it using setZipcode method`);
                }
                zipcode = zipcode || location.zipcode.zipcode;
                const coordinates = await this.geocoding.getGeoCoordinatesByZipCode(zipcode, countryCode);
                const currentWeather = this.getByGeoCoordinates({ latitude: coordinates.lat, longitude: coordinates.lon, queryType });
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
export default OpenWeather;
