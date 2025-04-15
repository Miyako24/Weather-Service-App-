import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
interface Weather {
  temperature: number;
  description: string;
  city: string;
}
// TODO: Complete the WeatherService class
class WeatherService {
 
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string | undefined = process.env.API_KEY;

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    const response = await axios.get(url);
    const data = (response.data as any[])[0];
    return { latitude: data.lat, longitude: data.lon };
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const { latitude, longitude } = coordinates;
    const url = `${this.baseURL}/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data as { main: { temp: number }; weather: { description: string }[]; name: string };

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
    };
  }

  public async getWeatherByCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    return this.fetchWeatherData(coordinates);
  }
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
