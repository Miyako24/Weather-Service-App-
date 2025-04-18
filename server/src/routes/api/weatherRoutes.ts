import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();


// DONE: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('here is req.body:', req.body);
    const { cityName } = req.body;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }
    // DONE: GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    if (!weatherData) {
      return res.status(404).json({ error: 'Weather data not found' });
    }
    // DONE: save city to search history
    await HistoryService.saveSearch(cityName);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.read();
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// * BONUS TODO: DELETE city from search history

export default router;
