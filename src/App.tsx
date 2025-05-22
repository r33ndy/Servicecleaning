import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuoteForm from './components/QuoteForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Hero />
      
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Your Cleaning Quote</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to receive an instant quote for our professional cleaning services.
              Customize your cleaning package to fit your specific needs.
            </p>
          </div>
          
          <QuoteForm />
        </div>
      </section>
      
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;