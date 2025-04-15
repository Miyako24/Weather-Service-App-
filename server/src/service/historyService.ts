// TODO: Define a City class with name and id properties
import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
// DONE: Complete the HistoryService class
class City {
  id: string 
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;

  }

}
  
class HistoryService {
  async deleteSearch(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
  //getSearchHistory() {
   // throw new Error('Method not implemented.');
  //}
  async saveSearch(city: City): Promise<void> {
    const cities = await this.read();
    cities.push(city);
    await this.write(cities);
  }
  private filePath = 'searchHistory.json';
  

  // DONE: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is empty, return an empty array
      return [];
    }
  }

  // DONE: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }
  // DONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // DONE Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(cityName);

    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
