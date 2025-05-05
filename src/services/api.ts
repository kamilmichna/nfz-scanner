import { AppointmentProvider, SearchParams, NFZApiResponse } from "../types";
import { provinces } from "../data/provinces";

const BASE_URL = "https://api.nfz.gov.pl/app-itl-api/queues";

// Map our province IDs to NFZ API province codes
const provinceCodeMap: Record<string, string> = {
  dolnoslaskie: "01",
  "kujawsko-pomorskie": "02",
  lubelskie: "03",
  lubuskie: "04",
  lodzkie: "05",
  malopolskie: "06",
  mazowieckie: "07",
  opolskie: "08",
  podkarpackie: "09",
  podlaskie: "10",
  pomorskie: "11",
  slaskie: "12",
  swietokrzyskie: "13",
  "warminsko-mazurskie": "14",
  wielkopolskie: "15",
  zachodniopomorskie: "16",
};

const getProvincesToSearch = (
  provinceId: string,
  includeNeighbors: boolean
): string[] => {
  if (!includeNeighbors) {
    return [provinceId];
  }

  const province = provinces.find((p) => p.id === provinceId);
  if (!province) {
    return [provinceId];
  }

  return [provinceId, ...province.neighbors];
};

export const fetchAppointments = async (
  params: SearchParams
): Promise<AppointmentProvider[]> => {
  try {
    const { specialty, province, includeNeighbors } = params;
    const provincesToSearch = getProvincesToSearch(province, includeNeighbors);

    const allAppointments: AppointmentProvider[] = [];

    for (const provinceId of provincesToSearch) {
      const provinceCode = provinceCodeMap[provinceId];
      if (!provinceCode) continue;

      const queryParams = new URLSearchParams({
        page: "1",
        limit: "25",
        case: "1",
        province: provinceCode,
        benefit: specialty,
        format: "json",
      });

      const url = `${BASE_URL}?${queryParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }

      const responseData: NFZApiResponse = await response.json();

      // Transform API response to match our AppointmentProvider interface
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day for fair comparison

      const transformedData = responseData.data
        .filter(
          (queue) =>
            queue.attributes.dates.applicable &&
            queue.attributes.dates.date !== null &&
            new Date(queue.attributes.dates.date) >= today // Filter out past dates
        )
        .map((queue) => ({
          id: queue.id,
          provider: queue.attributes.provider,
          address: queue.attributes.address,
          specialty: queue.attributes.benefit,
          earliestDate: queue.attributes.dates.date || "",
          contact: queue.attributes.phone,
          city: queue.attributes.locality,
          attributes: queue.attributes,
        }));

      allAppointments.push(...transformedData);
    }

    return allAppointments.sort(
      (a, b) =>
        new Date(a.earliestDate).getTime() - new Date(b.earliestDate).getTime()
    );
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};
