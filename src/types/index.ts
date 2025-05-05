// Type definitions for the NFZ Appointment Finder application

export interface Specialty {
  id: string;
  name: string;
}

export interface Province {
  id: string;
  name: string;
  neighbors: string[];
}

export interface SearchParams {
  specialty: string;
  province: string;
  includeNeighbors: boolean;
}

export interface AppointmentProvider {
  id: string;
  provider: string;
  address: string;
  specialty: string;
  earliestDate: string;
  contact?: string;
  city?: string;
  attributes?: NFZQueueAttributes;
}

export interface NFZApiResponse {
  data: NFZQueue[];
  links: {
    first: string;
    prev: string | null;
    self: string;
    next: string | null;
    last: string;
  };
  meta: {
    count: number;
    title: string;
    page: number;
    limit: number;
    provider: string;
    language: string;
  };
}

export interface NFZQueue {
  type: string;
  id: string;
  attributes: NFZQueueAttributes;
}

export interface NFZQueueAttributes {
  benefit: string;
  provider: string;
  address: string;
  locality: string;
  phone: string;
  dates: {
    applicable: boolean;
    date: string | null;
    date_situation_as_at: string | null;
  };
  statistics: {
    provider_data: {
      awaiting: number;
      removed: number;
      average_period: number;
      update: string;
    };
    computed_data: any;
  };
  latitude: number;
  longitude: number;
  covid_19: string;
  toilet: string;
  ramp: string;
  car_park: string;
  elevator: string;
}

export interface ApiResponse {
  data: AppointmentProvider[];
  isLoading: boolean;
  error: string | null;
}
