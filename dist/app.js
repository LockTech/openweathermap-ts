import OpenWeather from './OpenWeather.js';
import { AIR_POLLUTION, CURRENT_WEATHER_ENDPOINT, FORECAST } from './helpers/index.js';
class OpenWeatherMap extends OpenWeather {
    constructor({ apiKey, units, language }) {
        super({ apiKey, units, language });
    }
    /**
     * @summary openweathermap.org isnt maintainging the built in Geocoding API anymore, its still usable but not maintained anymore. Better use getCurrentWeatherByCityName instead (uses the seperate Geocoding API)
     * @deprecated Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality. Please use Geocoder API if you need automatic convert city names and zip-codes to corrdinates vice versa. (https://openweathermap.org/weather#builtin).
     */
    builtInGetCurrentWeatherByCityName(location) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.builtInGetByCityName({
                    location,
                    queryType: CURRENT_WEATHER_ENDPOINT
                }));
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * @summary uses the geolocation-API to get the current weather by city name
     * @param location
     * @returns
     */
    getCurrentWeatherByCityName(location) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = this.getByCityName({ location, queryType: CURRENT_WEATHER_ENDPOINT });
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
    * @summary openweathermap.org isnt maintainging the built in Geocoding API anymore, its still usable but not maintained anymore.
    * @deprecated  Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality. Please use Geocoder API if you need automatic convert city names and zip-codes to corrdinates vice versa. (https://openweathermap.org/weather#builtin)
    */
    async getCurrentWeatherByCityId(cityId) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.getByCityId({
                    cityId,
                    queryType: CURRENT_WEATHER_ENDPOINT
                }));
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async getCurrentWeatherByGeoCoordinates(latitude, longitude) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.getByGeoCoordinates({
                    latitude,
                    longitude,
                    queryType: CURRENT_WEATHER_ENDPOINT
                }));
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
  *
  * @deprecated  Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality. Please use Geocoder API if you need automatic convert city names and zip-codes to corrdinates vice versa. (https://openweathermap.org/weather#builtin)
  */
    async builtInGetCurrentWeatherByZipcode(zipcode, countryCode) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.builtInGetByZipcode(zipcode, CURRENT_WEATHER_ENDPOINT, countryCode));
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * @summary uses the geolocation-API to get the current weather by zipcode and then uses the geolocation to get the current weather
     * @param zipcode
     * @param countryCode
     * @returns
     */
    async getCurrentWeatherByZipcode(zipcode, countryCode) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = this.getByZipcode(zipcode, CURRENT_WEATHER_ENDPOINT, countryCode);
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
    builtInGetThreeHourForecastByCityName(location) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.getByCityName({
                    location,
                    queryType: FORECAST
                }));
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getThreeHourForecastByCityName(location) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = this.getByCityName({ location, queryType: FORECAST });
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
    getThreeHourForecastByCityId(cityId) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.getByCityId({
                    cityId,
                    queryType: FORECAST
                }));
                resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getThreeHourForecastByGeoCoordinates(latitude, longitude) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.getByGeoCoordinates({
                    latitude,
                    longitude,
                    queryType: FORECAST
                }));
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
    async getThreeHourForecastByZipcode(zipcode, countryCode) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentWeather = (await this.builtInGetByZipcode(zipcode, FORECAST, countryCode));
                return resolve(currentWeather);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async getAirPollutionByGeoCoordinates(latitude, longitude) {
        return new Promise(async (resolve, reject) => {
            try {
                const airPollution = (await this.getByGeoCoordinates({
                    latitude,
                    longitude,
                    queryType: AIR_POLLUTION
                }));
                resolve(airPollution);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
export default OpenWeatherMap;
