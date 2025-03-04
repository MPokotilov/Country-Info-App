/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { HttpError } from '../errors/HttpError';

const NAGER_API_BASE =
  process.env.NAGER_API_BASE || 'https://date.nager.at/api/v3';

const COUNTRIES_NOW_API_BASE =
  process.env.COUNTRIES_NOW_API_BASE || 'https://countriesnow.space/api/v0.1';

type PopulationData = {
  country: string;
  code: string;
  iso3: string;
  populationCounts: {
    year: number;
    value: number;
  }[];
};

type FlagData = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export async function getAvailableCountries(): Promise<any> {
  try {
    const url = `${NAGER_API_BASE}/AvailableCountries`;
    const response = await axios.get(url);
    return response.data;
  } catch {
    throw new HttpError(
      'Failed to fetch available countries from Nager API',
      502,
      'E_COUNTRIES_FETCH',
    );
  }
}

export async function getCountryInfo(countryCode: string): Promise<{
  borders: any;
  population: PopulationData | null;
  flag: string | null;
}> {
  try {
    const borderUrl = `${NAGER_API_BASE}/CountryInfo/${countryCode}`;
    const borderResponse = await axios.get(borderUrl);
    const borderCountries = borderResponse.data?.borders || [];

    const populationUrl = `${COUNTRIES_NOW_API_BASE}/countries/population`;
    const populationResponse = await axios.get(populationUrl);
    const populationData = (
      populationResponse.data?.data as PopulationData[] | undefined
    )?.find(
      (item: PopulationData) =>
        item.iso3.toUpperCase() === countryCode.toUpperCase(),
    );

    const flagUrl = `${COUNTRIES_NOW_API_BASE}/countries/flag/images`;
    const flagResponse = await axios.get(flagUrl);
    console.log('Flag API response:', flagResponse.data);
    const flagData = (flagResponse.data?.data as FlagData[] | undefined)?.find(
      (item: FlagData) => {
        console.log('Checking flag iso3:', item.iso3);
        return item.iso3.toUpperCase() === countryCode.toUpperCase();
      },
    );

    return {
      borders: borderCountries,
      population: populationData || null,
      flag: flagData?.flag || null,
    };
  } catch {
    throw new HttpError(
      `Failed to fetch country info for ${countryCode}`,
      502,
      'E_COUNTRY_INFO_FETCH',
    );
  }
}
