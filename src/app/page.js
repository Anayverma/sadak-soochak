"use client"
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('name', name);
    console.log('location', location);
    console.log('mobileNumber', mobileNumber);
    console.log('image', image);

    try {
      const response = await fetch('/api/saveUserData', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,location,mobileNumber,image }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("frcvgnj",data.name)
      } else {
        console.log("error")
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white text-black w-full border border-gray-300 rounded py-2 px-4 mb-4"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-white text-black w-full border border-gray-300 rounded py-2 px-4 mb-4"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="bg-white text-black w-full border border-gray-300 rounded py-2 px-4 mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-white text-black w-full border border-gray-300 rounded py-2 px-4 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
