import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute right-10 top-40 w-20 h-20 rounded-full bg-white"></div>
        <div className="absolute left-1/3 bottom-10 w-30 h-30 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Professional Cleaning Services at Your Fingertips
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-lg">
              Get an instant quote for your home or office cleaning needs. 
              Book online in seconds and enjoy a spotless space.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#quote-form" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get a Quote <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="#services" 
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                View Services
              </a>
            </div>
            
            <div className="flex flex-wrap mt-10 gap-6">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <ShieldCheck size={20} className="text-yellow-300" />
                </div>
                <span>100% Satisfaction</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <Sparkles size={20} className="text-yellow-300" />
                </div>
                <span>Professional Cleaners</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <Clock size={20} className="text-yellow-300" />
                </div>
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-10">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Quick Quote Calculator</h3>
              <p className="mb-6">Get an instant estimate for your cleaning needs in seconds!</p>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">What type of cleaning do you need?</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select service type</option>
                    <option value="regular">Regular Cleaning</option>
                    <option value="deep">Deep Cleaning</option>
                    <option value="move">Move In/Out Cleaning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Property size (approx. sq. ft)</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select property size</option>
                    <option value="small">Small (up to 1000 sq ft)</option>
                    <option value="medium">Medium (1000-2000 sq ft)</option>
                    <option value="large">Large (2000+ sq ft)</option>
                  </select>
                </div>
              </div>
              <a 
                href="#quote-form" 
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-medium text-center shadow-md hover:opacity-90 transition-opacity duration-200"
              >
                Get Detailed Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;