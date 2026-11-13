import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams({
      city,
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-1 gap-3 rounded-xl bg-white p-5 shadow md:grid-cols-3 lg:grid-cols-6">

      <input
        type="text"
        placeholder="Місто"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded border p-3"
      />

      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="rounded border p-3"
      />

      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="rounded border p-3"
      />

      <input
        type="number"
        min="1"
        value={adults}
        onChange={(e) => setAdults(Number(e.target.value))}
        className="rounded border p-3"
        placeholder="Дорослі"
      />

      <input
        type="number"
        min="0"
        value={children}
        onChange={(e) => setChildren(Number(e.target.value))}
        className="rounded border p-3"
        placeholder="Діти"
      />

      <button
        onClick={handleSearch}
        className="rounded bg-yellow-400 p-3 font-bold text-black hover:bg-yellow-500"
      >
        Шукати
      </button>

    </div>
  );
}

export default SearchBar;