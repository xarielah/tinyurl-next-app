export interface ClicksOverTime {
  date: string;
  clicks: number;
}

export interface CountryDistribution {
  country: string;
  clicks: number;
}

export interface LinkEvent {
  location: string;
  timestamp: number;
}

export interface ReportsResult {
  count: number;
  locations: Record<string, number>;
  events: LinkEvent[];
  url: string;
  createdAt: string;
}

export interface ShortURLEvent {
  timestamp: number;
  location: string;
}
