import axios from 'axios';
import { HttpError } from '../errors/HttpError';

type Holiday = {
  localName: string;
  date: string;
};

const userCalendars: { [userId: string]: Holiday[] } = {};

export async function addHolidaysToCalendar(
  userId: string,
  countryCode: string,
  year: number,
  holidayList?: string[],
): Promise<Holiday[]> {
  try {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    const response = await axios.get(url);
    let holidays: Holiday[] = response.data;

    if (holidayList && holidayList.length > 0) {
      holidays = holidays.filter((holiday: Holiday) =>
        holidayList.includes(holiday.localName),
      );
    }

    if (!userCalendars[userId]) {
      userCalendars[userId] = [];
    }

    userCalendars[userId].push(...holidays);

    return userCalendars[userId];
  } catch {
    throw new HttpError(
      'Failed to add holidays to user calendar',
      500,
      'E_CALENDAR_SAVE',
    );
  }
}
