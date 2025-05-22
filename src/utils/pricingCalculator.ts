import { SERVICES, ADDITIONAL_SERVICES } from '../constants/services';
import { QuoteFormData } from '../types';

export const calculateQuote = (formData: QuoteFormData): { 
  basePrice: number; 
  sizePrice: number;
  bathroomPrice: number;
  additionalServicesPrice: number; 
  totalPrice: number;
  breakdown: { name: string; price: number }[];
} => {
  const selectedService = SERVICES.find(service => service.id === formData.serviceType);
  
  if (!selectedService) {
    throw new Error('Service not found');
  }
  
  // Calculate base price
  const basePrice = formData.customPrices?.basePrice || selectedService.basePrice;
  
  // Calculate price based on size
  let sizePrice = 0;
  if (formData.calculationType === 'sqft' && formData.squareFeet > 0) {
    const pricePerSqFt = formData.customPrices?.pricePerSqFt || selectedService.pricePerSqFt;
    sizePrice = formData.squareFeet * pricePerSqFt;
  } else if (formData.calculationType === 'rooms' && formData.roomCount > 0) {
    const pricePerRoom = formData.customPrices?.pricePerRoom || selectedService.pricePerRoom;
    sizePrice = formData.roomCount * pricePerRoom;
  }

  // Calculate bathroom price
  const pricePerBathroom = formData.customPrices?.pricePerBathroom || selectedService.pricePerBathroom;
  const bathroomPrice = formData.bathroomCount * pricePerBathroom;
  
  // Calculate price for additional services
  const additionalServicesPrice = formData.additionalServices.reduce((total, serviceId) => {
    const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
    const customPrice = formData.customPrices?.[serviceId];
    return total + (customPrice || (service ? service.price : 0));
  }, 0);
  
  // Calculate total price
  const totalPrice = basePrice + sizePrice + bathroomPrice + additionalServicesPrice;
  
  // Create breakdown
  const breakdown = [
    { name: `${selectedService.name} (Base)`, price: basePrice },
    { 
      name: formData.calculationType === 'sqft' 
        ? `Square Footage (${formData.squareFeet} sq ft)` 
        : `Room Count (${formData.roomCount} rooms)`, 
      price: sizePrice 
    },
    { name: `Bathrooms (${formData.bathroomCount})`, price: bathroomPrice },
    ...formData.additionalServices.map(serviceId => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
      const customPrice = formData.customPrices?.[serviceId];
      return { 
        name: service ? service.name : '', 
        price: customPrice || (service ? service.price : 0)
      };
    })
  ];
  
  return {
    basePrice,
    sizePrice,
    bathroomPrice,
    additionalServicesPrice,
    totalPrice,
    breakdown
  };
};