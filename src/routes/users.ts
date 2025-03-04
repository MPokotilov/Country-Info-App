import { Router } from 'express';
import { addHolidaysToCalendar } from '../services/calendarService';

const router = Router();

router.post(
  '/:userId/calendar/holidays',
  async (req, res, next): Promise<void> => {
    const { userId } = req.params;
    const { countryCode, year, holidays } = req.body;

    if (!countryCode || !year) {
      res.status(400).json({
        code: 'E_BAD_REQUEST',
        message: 'countryCode and year are required',
      });
      return;
    }

    if (holidays && !Array.isArray(holidays)) {
      res.status(400).json({
        code: 'E_BAD_REQUEST',
        message: 'holidays must be an array of strings',
      });
      return;
    }

    try {
      const result = await addHolidaysToCalendar(
        userId,
        countryCode,
        year,
        holidays,
      );
      res.json({ message: 'Holidays added to calendar', data: result });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
