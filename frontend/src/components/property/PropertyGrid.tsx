import React from 'react';
import PropertyCard from './PropertyCard';

interface Property {
  id: number;
  title: string;
  city: string;
  price: number;
  rating: number;
  image: string;
}

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
}

function PropertyGrid({ properties, loading }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-xl bg-white shadow"
          >
            <div className="h-52 bg-gray-300"></div>
            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 rounded bg-gray-300"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="h-5 w-1/3 rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          title={property.title}
          city={property.city}
          price={property.price}
          rating={property.rating}
          image={property.image}
        />
      ))}
    </div>
  );
}

export default PropertyGrid;