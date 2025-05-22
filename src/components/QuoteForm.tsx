import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { QuoteFormData } from '../types';
import { SERVICES, ADDITIONAL_SERVICES, TIME_SLOTS } from '../constants/services';
import ServiceCard from './ServiceCard';
import AdditionalServiceCard from './AdditionalServiceCard';
import PricingSummary from './PricingSummary';

const initialFormData: QuoteFormData = {
  serviceType: '',
  calculationType: 'sqft',
  squareFeet: 1000,
  roomCount: 3,
  bathroomCount: 1,
  additionalServices: [],
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
  customPrices: {}
};

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
  };
  
  const handleCalculationTypeChange = (type: 'sqft' | 'rooms') => {
    setFormData(prev => ({
      ...prev,
      calculationType: type
    }));
  };
  
  const handleSquareFeetChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      squareFeet: value
    }));
  };
  
  const handleRoomCountChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      roomCount: value
    }));
  };

  const handleBathroomCountChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      bathroomCount: value
    }));
  };
  
  const handleAdditionalServiceToggle = (serviceId: string) => {
    setFormData(prev => {
      const isSelected = prev.additionalServices.includes(serviceId);
      return {
        ...prev,
        additionalServices: isSelected
          ? prev.additionalServices.filter(id => id !== serviceId)
          : [...prev.additionalServices, serviceId]
      };
    });
  };

  const handleCustomPriceChange = (key: string, value: string) => {
    const numValue = parseFloat(value);
    setFormData(prev => ({
      ...prev,
      customPrices: {
        ...prev.customPrices,
        [key]: isNaN(numValue) ? 0 : numValue
      }
    }));
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      date: e.target.value
    }));
  };
  
  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      time
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const canProceedToStep2 = formData.serviceType !== '' && 
    ((formData.calculationType === 'sqft' && formData.squareFeet > 0) || 
     (formData.calculationType === 'rooms' && formData.roomCount > 0));
     
  const canProceedToStep3 = formData.date !== '' && formData.time !== '';

  const selectedService = SERVICES.find(service => service.id === formData.serviceType);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium 
                      ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    {step}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    {step === 1 ? 'Services' : step === 2 ? 'Schedule' : 'Details'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 h-1 bg-gray-200 w-full rounded"></div>
              <div 
                className="absolute top-0 h-1 bg-blue-500 rounded transition-all duration-300" 
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Select Service Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SERVICES.map(service => (
                    <ServiceCard 
                      key={service.id}
                      service={service}
                      isSelected={formData.serviceType === service.id}
                      onSelect={handleServiceSelect}
                    />
                  ))}
                </div>

                {selectedService && (
                  <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Customize Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Base Price ($)</label>
                        <input
                          type="number"
                          value={formData.customPrices.basePrice || selectedService.basePrice}
                          onChange={(e) => handleCustomPriceChange('basePrice', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Price per Square Foot ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.customPrices.pricePerSqFt || selectedService.pricePerSqFt}
                          onChange={(e) => handleCustomPriceChange('pricePerSqFt', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Price per Room ($)</label>
                        <input
                          type="number"
                          value={formData.customPrices.pricePerRoom || selectedService.pricePerRoom}
                          onChange={(e) => handleCustomPriceChange('pricePerRoom', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Price per Bathroom ($)</label>
                        <input
                          type="number"
                          value={formData.customPrices.pricePerBathroom || selectedService.pricePerBathroom}
                          onChange={(e) => handleCustomPriceChange('pricePerBathroom', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Property Size</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex space-x-4 mb-6">
                    <button
                      className={`flex-1 py-2 px-4 rounded-lg border text-center transition-colors duration-200
                        ${formData.calculationType === 'sqft' 
                          ? 'bg-blue-500 text-white border-blue-500' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      onClick={() => handleCalculationTypeChange('sqft')}
                    >
                      Square Footage
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 rounded-lg border text-center transition-colors duration-200
                        ${formData.calculationType === 'rooms' 
                          ? 'bg-blue-500 text-white border-blue-500' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      onClick={() => handleCalculationTypeChange('rooms')}
                    >
                      Room Count
                    </button>
                  </div>
                  
                  {formData.calculationType === 'sqft' ? (
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Square Footage: {formData.squareFeet} sq ft
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="100"
                        value={formData.squareFeet}
                        onChange={(e) => handleSquareFeetChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>500 sq ft</span>
                        <span>5000 sq ft</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Number of Rooms: {formData.roomCount}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.roomCount}
                        onChange={(e) => handleRoomCountChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 room</span>
                        <span>10 rooms</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <label className="block text-gray-700 mb-2">
                      Number of Bathrooms: {formData.bathroomCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.bathroomCount}
                      onChange={(e) => handleBathroomCountChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 bathroom</span>
                      <span>5 bathrooms</span>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Additional Services</h2>
                <div className="space-y-3">
                  {ADDITIONAL_SERVICES.map(service => (
                    <div key={service.id}>
                      <AdditionalServiceCard 
                        service={service}
                        isSelected={formData.additionalServices.includes(service.id)}
                        onToggle={handleAdditionalServiceToggle}
                      />
                      {formData.additionalServices.includes(service.id) && (
                        <div className="ml-12 mt-2">
                          <label className="block text-gray-700 mb-2">Custom Price ($)</label>
                          <input
                            type="number"
                            value={formData.customPrices[service.id] || service.price}
                            onChange={(e) => handleCustomPriceChange(service.id, e.target.value)}
                            className="w-48 p-2 border border-gray-300 rounded"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
              
              <div className="flex justify-end mt-8">
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={nextStep}
                  disabled={!canProceedToStep2}
                >
                  Continue to Schedule
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Schedule */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Select Date & Time</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="relative mb-6">
                    <label className="block text-gray-700 mb-2">Preferred Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                      />
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Preferred Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`p-3 rounded-lg border flex items-center justify-center transition-colors duration-200
                            ${formData.time === time 
                              ? 'bg-blue-100 border-blue-500 text-blue-700' 
                              : 'border-gray-300 hover:border-blue-400'
                            }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          <Clock size={16} className="mr-2" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              
              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={nextStep}
                  disabled={!canProceedToStep3}
                >
                  Continue to Details
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Contact Details */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fadeIn">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="address">Service Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="notes">Special Instructions</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific instructions or requests..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              </section>
              
              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="submit"
                >
                  Submit Quote Request
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:w-1/3">
          <PricingSummary formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;