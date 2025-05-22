import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Homeowner',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'The cleaning service exceeded my expectations! My home has never looked so spotless. The team was professional, thorough, and paid attention to every detail.'
  },
  {
    id: 2,
    name: 'Michael Thompson',
    title: 'Office Manager',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'We\'ve been using CleanQuote for our office cleaning needs for over a year now. Their consistent quality and reliability have made them an essential partner for our business.'
  },
  {
    id: 3,
    name: 'Jennifer Davis',
    title: 'Real Estate Agent',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4,
    text: 'I recommend CleanQuote to all my clients for move-in/move-out cleaning. Their detailed service makes properties show-ready and impresses potential buyers every time.'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our cleaning services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6 relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-2 rounded-full">
                <Quote size={24} />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#quote-form" 
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition-colors duration-200"
          >
            Join Our Happy Customers
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;