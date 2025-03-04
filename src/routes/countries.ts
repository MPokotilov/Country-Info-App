import { Router } from 'express';
import {
  getAvailableCountries,
  getCountryInfo,
} from '../services/countryService';

const router = Router();

router.get('/', async (req, res, next): Promise<void> => {
  try {
    const countries = await getAvailableCountries();
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

router.get('/:countryCode/info', async (req, res, next): Promise<void> => {
  const { countryCode } = req.params;
  try {
    const info = await getCountryInfo(countryCode);
    if (!info) {
      res.status(404).json({
        code: 'E_NOT_FOUND',
        message: `Country info not found for code ${countryCode}`,
      });
      return;
    }
    res.json(info);
  } catch (error) {
    next(error);
  }
});

export default router;
