export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerSqFt: number;
  pricePerRoom: number;
  pricePerBathroom: number;
  icon: string;
}

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface QuoteFormData {
  serviceType: string;
  calculationType: 'sqft' | 'rooms';
  squareFeet: number;
  roomCount: number;
  bathroomCount: number;
  additionalServices: string[];
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  customPrices: {
    [key: string]: number;
  };
}