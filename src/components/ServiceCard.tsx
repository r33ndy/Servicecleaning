import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onSelect }) => {
  // Dynamically get the icon from Lucide
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Sparkles;
  
  return (
    <div 
      className={`
        relative p-6 rounded-lg shadow-md transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'bg-blue-50 border-2 border-blue-500 transform scale-[1.02]' 
          : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg'
        }
      `}
      onClick={() => onSelect(service.id)}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1">
          <LucideIcons.Check size={16} />
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
          <IconComponent size={24} />
        </div>
        <h3 className="ml-3 text-lg font-semibold">{service.name}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="text-sm text-gray-500 space-y-1">
        <p>Base price: <span className="font-semibold">${service.basePrice}</span></p>
        <p>Per square foot: <span className="font-semibold">${service.pricePerSqFt.toFixed(2)}</span></p>
        <p>Per room: <span className="font-semibold">${service.pricePerRoom}</span></p>
        <p>Per bathroom: <span className="font-semibold">${service.pricePerBathroom}</span></p>
      </div>
    </div>
  );
};

export default ServiceCard;