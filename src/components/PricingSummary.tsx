import React from 'react';
import { QuoteFormData } from '../types';
import { calculateQuote } from '../utils/pricingCalculator';

interface PricingSummaryProps {
  formData: QuoteFormData;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ formData }) => {
  // Only calculate if we have a service type selected
  const quoteData = formData.serviceType 
    ? calculateQuote(formData) 
    : { basePrice: 0, sizePrice: 0, additionalServicesPrice: 0, totalPrice: 0, breakdown: [] };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
      
      <div className="space-y-3 mb-6">
        {quoteData.breakdown.map((item, index) => (
          item.price > 0 && (
            <div key={index} className="flex justify-between text-gray-700">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          )
        ))}
      </div>
      
      {quoteData.breakdown.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-blue-600">${quoteData.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <button 
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-medium shadow-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formData.serviceType || quoteData.totalPrice === 0}
        >
          Book Now
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-3">
          Final price may vary based on conditions at service location.
        </p>
      </div>
    </div>
  );
};

export default PricingSummary;