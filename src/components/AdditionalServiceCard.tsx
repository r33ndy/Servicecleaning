import React from 'react';
import * as LucideIcons from 'lucide-react';
import { AdditionalService } from '../types';

interface AdditionalServiceCardProps {
  service: AdditionalService;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const AdditionalServiceCard: React.FC<AdditionalServiceCardProps> = ({ 
  service, 
  isSelected, 
  onToggle 
}) => {
  // Dynamically get the icon from Lucide
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Plus;
  
  return (
    <div 
      className={`
        flex items-center p-4 rounded-lg shadow-sm transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'bg-blue-50 border border-blue-300' 
          : 'bg-white border border-gray-200 hover:border-blue-200 hover:bg-gray-50'
        }
      `}
      onClick={() => onToggle(service.id)}
    >
      <div className={`p-2 rounded-full mr-4 ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
        <IconComponent size={20} />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{service.name}</h4>
          <span className="text-blue-600 font-semibold">${service.price}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
      </div>
      
      <div className="ml-4">
        <div className={`
          w-5 h-5 rounded-full border flex items-center justify-center
          ${isSelected 
            ? 'border-blue-500 bg-blue-500' 
            : 'border-gray-300'
          }
        `}>
          {isSelected && <LucideIcons.Check size={12} className="text-white" />}
        </div>
      </div>
    </div>
  );
};

export default AdditionalServiceCard;