import { Service, AdditionalService } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'regular',
    name: 'Regular Cleaning',
    description: 'Standard cleaning service including dusting, vacuuming, mopping, and bathroom cleaning.',
    basePrice: 80,
    pricePerSqFt: 0.10,
    pricePerRoom: 25,
    pricePerBathroom: 30,
    icon: 'Sparkles'
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Thorough cleaning of all areas including hard-to-reach places, appliances, and detailed attention.',
    basePrice: 150,
    pricePerSqFt: 0.18,
    pricePerRoom: 40,
    pricePerBathroom: 45,
    icon: 'SprayCan'
  },
  {
    id: 'move',
    name: 'Move In/Out Cleaning',
    description: 'Complete cleaning service for moving in or out of a property, ensuring it\'s spotless.',
    basePrice: 200,
    pricePerSqFt: 0.20,
    pricePerRoom: 50,
    pricePerBathroom: 60,
    icon: 'Moving'
  }
];

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: 'windows',
    name: 'Window Cleaning',
    description: 'Interior and exterior window cleaning for crystal clear views.',
    price: 45,
    icon: 'Windows'
  },
  {
    id: 'fridge',
    name: 'Refrigerator Cleaning',
    description: 'Deep cleaning of refrigerator interior and exterior.',
    price: 35,
    icon: 'RefrigeratorIcon'
  },
  {
    id: 'oven',
    name: 'Oven Cleaning',
    description: 'Detailed cleaning of oven interior and exterior.',
    price: 40,
    icon: 'Flame'
  },
  {
    id: 'cabinets',
    name: 'Cabinet Cleaning',
    description: 'Interior and exterior cabinet cleaning and organization.',
    price: 60,
    icon: 'Combine'
  },
  {
    id: 'carpet',
    name: 'Carpet Deep Cleaning',
    description: 'Professional carpet cleaning for stain and odor removal.',
    price: 85,
    icon: 'Waves'
  }
];

export const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];