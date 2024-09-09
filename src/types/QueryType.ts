export type QueryType = WeatherQueryType | GeoQueryType;

export type WeatherQueryType = 'weather' | 'air_pollution' | 'forecast';
export type GeoQueryType = 'direct' | 'reverse' | 'zip';
