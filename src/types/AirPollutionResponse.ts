export interface AirPollutionResponse {
  /**
   * Coordinates from the specified location.
   */
  coord: {
    lat: number
    lon: number
  }
  list: Array<{
    /**
     * Date and time UTC.
     */
    dt: number
    /**
     * Summary of the overall air quality at the given coordinates.
     */
    main: {
      /**
       * Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor. If you want to recalculate Air Quality indexes according UK, Europe, USA and Mainland China scales please use ["Air Pollution Index levels scale"](https://openweathermap.org/air-pollution-index-levels) page.
       */
      aqi: number
    }
    /**
     * Individual concentrations of polluting gases that, together, make up the overall air quality in the region.
     */
    components: {
      /**
       * Concentration of CO (Carbon monoxide), μg/m^3
       */
      co: number
      /**
       * Concentration of NO (Nitrogen monoxide), μg/m^3
       */
      no: number
      /**
       * Concentration of NO2 (Nitrogen dioxide), μg/m^3
       */
      no2: number
      /**
       * Concentration of O3 (Ozone), μg/m^3
       */
      o3: number
      /**
       * Concentration of SO2 (Sulphur dioxide), μg/m^3
       */
      so2: number
      /**
       * Concentration of PM2.5 (Fine particles matter), μg/m^3
       */
      pm2_5: number
      /**
       * Concentration of PM10 (Coarse particulate matter), μg/m^3
       */
      pm10: number
      /**
       * Concentration of NH3 (Ammonia), μg/m^3
       */
      nh3: number
    }
  }>
}
