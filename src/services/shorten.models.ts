export interface RedirectPayload {
  shortId: string;
  locationInformation: {
    country?: string;
    latitude?: string;
    longitude?: string;
    city?: string;
  };
}

// API Results

export interface RedirectResult {
  url: string;
}
