export interface RedirectPayload {
  shortId: string;
  locationInformation: {
    country?: string;
    countryRegion?: string;
    latitude?: string;
    longitude?: string;
    flag?: string;
  };
}

// API Results

export interface RedirectResult {
  url: string;
}
