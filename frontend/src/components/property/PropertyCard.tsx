import React from 'react';

interface PropertyCardProps {
  title: string;
  city: string;
  price: number;
  rating: number;
  image: string;
}

function PropertyCard({
  title,
  city,
  price,
  rating,
  image,
}: PropertyCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl">

      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">
          3D TOUR
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold">
          {title}
        </h3>

        <p className="mt-1 text-gray-500">
          {city}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-bold text-booking-blue">
            {price} грн / ніч
          </p>

          <p className="font-bold">
            ★ {rating}
          </p>
        </div>
      </div>

    </div>
  );
}

export default PropertyCard;