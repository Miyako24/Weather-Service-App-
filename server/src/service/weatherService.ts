import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Weather {
  temperature: number;
  description: string;
  city: string;
}

interface GeocodeResponse {
  lat: number;
  lon: number;
}

interface WeatherResponse {
  main: { temp: number };
  weather: { description: string }[];
  name: string;
}

class WeatherService {

    private baseURL: string = process.env.API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
    private geocodeURL: string = 'https://api.openweathermap.org/geo/1.0';
    private apiKey: string | undefined = process.env.API_KEY;

  private buildGeocodeQuery(city: string): string {
    return `${this.geocodeURL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${this.apiKey}`;
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    const { latitude, longitude } = coordinates;
    return `${this.baseURL}/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
  }

  private async fetchLocationData(city: string): Promise<GeocodeResponse> {
    const url = this.buildGeocodeQuery(city);
    const response = await axios.get<GeocodeResponse[]>(url);
    if (!response.data.length) {
      throw new Error(`No location data found for "${city}".`);       
    }
    const data = response.data[0];
    return { lat: data.lat, lon: data.lon };
  }

  private destructureLocationData(locationData: GeocodeResponse): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<WeatherResponse> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get<WeatherResponse>(url);
    return response.data;
  }

  private parseCurrentWeather(data: WeatherResponse): Weather {
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
    };
  }

  public async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const locationData = await this.fetchLocationData(city);
      const coordinates = this.destructureLocationData(locationData);
      const rawWeatherData = await this.fetchWeatherData(coordinates);
      return this.parseCurrentWeather(rawWeatherData);
    } catch (error) {
      console.error(`Failed to fetch weather for ${city}:`, error);
      throw new Error('Unable to retrieve weather data. Please try again.');
    }
  }

  // Optional: Build forecast array
  //private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    // Placeholder logic; implement based on actual forecast structure if needed
    //return [currentWeather];
  //}
}

export default new WeatherService();