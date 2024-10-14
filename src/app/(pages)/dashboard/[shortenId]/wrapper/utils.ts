import {
  type ClicksOverTime,
  type CountryDistribution,
  type ShortURLEvent,
} from "./report-models";

export function clicksByDateArray(events: ShortURLEvent[]): ClicksOverTime[] {
  const map = clicksByDateMap(events);
  return Array.from(map).map(([date, clicks]) => ({
    date,
    clicks,
  }));
}

export function clicksByCountryArray(
  events: ShortURLEvent[]
): CountryDistribution[] {
  const map = clicksByCountryMap(events);
  return Array.from(map).map(([country, clicks]) => ({
    country,
    clicks,
  }));
}

function clicksByDateMap(events: ShortURLEvent[]): Map<string, number> {
  return events.reduce<Map<string, number>>((acc, event) => {
    const date = new Date(event.timestamp).toLocaleDateString("he-IL");
    acc.set(date, (acc.get(date) || 0) + 1);
    return acc;
  }, new Map());
}

function clicksByCountryMap(events: ShortURLEvent[]) {
  return events.reduce<Map<string, number>>((acc, event) => {
    const country = event.country;
    acc.set(country, (acc.get(country) || 0) + 1);
    return acc;
  }, new Map());
}
