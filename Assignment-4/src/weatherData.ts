// Simple monthly weather data for New York City
// Just the 4 basics: Temperature, Humidity, Wind Speed, Precipitation

export interface MonthlyWeather {
    month: string;
    temperature: number;   // °C
    humidity: number;      // %
    windSpeed: number;     // km/h
    precipitation: number; // mm
}

export const monthlyData: MonthlyWeather[] = [
    { month: "Jan", temperature: 24, humidity: 60, windSpeed: 14, precipitation: 1 },
    { month: "Mar", temperature: 27, humidity: 62, windSpeed: 16, precipitation: 1 },
    { month: "Feb", temperature: 25, humidity: 58, windSpeed: 15, precipitation: 0 },
    { month: "Apr", temperature: 29, humidity: 68, windSpeed: 18, precipitation: 5 },
    { month: "May", temperature: 30, humidity: 75, windSpeed: 20, precipitation: 20 },
    { month: "Jun", temperature: 29, humidity: 85, windSpeed: 24, precipitation: 523 },
    { month: "Jul", temperature: 28, humidity: 88, windSpeed: 26, precipitation: 840 },
    { month: "Aug", temperature: 28, humidity: 88, windSpeed: 25, precipitation: 585 },
    { month: "Sep", temperature: 28, humidity: 84, windSpeed: 22, precipitation: 345 },
    { month: "Oct", temperature: 29, humidity: 75, windSpeed: 18, precipitation: 89 },
    { month: "Nov", temperature: 27, humidity: 65, windSpeed: 16, precipitation: 17 },
    { month: "Dec", temperature: 25, humidity: 61, windSpeed: 14, precipitation: 5 },
];
