import React from 'react';
import SearchBar from '../components/home/SearchBar';
import PropertyGrid from '../components/property/PropertyGrid';

function Home() {
  const properties = [
    {
      id: 1,
      title: 'Modern Apartment',
      city: 'Kraków, Poland',
      price: 250,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    },
    {
      id: 2,
      title: 'Luxury City Apartment',
      city: 'Warsaw, Poland',
      price: 350,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    },
    {
      id: 3,
      title: 'Cozy Studio',
      city: 'Wrocław, Poland',
      price: 180,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-booking-blue px-4 py-12 text-center text-white">
        <h1 className="mb-3 text-4xl font-bold">
          Welcome to Booking 3D!
        </h1>

        <p className="text-lg">
          Find your perfect place to stay
        </p>
      </section>

      <SearchBar />

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-6 text-2xl font-bold">
          Popular Properties
        </h2>

        <PropertyGrid
          properties={properties}
          loading={false}
        />
      </section>
    </div>
  );
}

export default Home;