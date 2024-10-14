import { type ClicksOverTime, type ShortURLEvent } from "./report-models";

export function clicksByDateArray(events: ShortURLEvent[]): ClicksOverTime[] {
  const map = clicksByDateMap(events);
  return Array.from(map).map(([date, clicks]) => ({
    date,
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
