"use client"
import { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import "../../public/styles/form.css";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function Home() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [image, setImage] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ss-images');
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setCloudinaryUrl(data.secure_url);
      } else {
        console.log('Error uploading image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location, mobileNumber, image: cloudinaryUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        setDisplayMessage({ message: 'Data submitted successfully!', imageUrl: cloudinaryUrl });
        setResultImageUrl(null); // Resetting resultImageUrl
        setTimeout(() => {
          setDisplayMessage(null);
        }, 10000);
        // Another POST request after successful form submission
        const secondResponse = await fetch('/api/anotherApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ previousImageUrl: cloudinaryUrl }),
        });
        if (secondResponse.ok) {
          const secondData = await secondResponse.json();
          console.log('Result Image URL:', secondData.resultImageUrl);
          setResultImageUrl(secondData.resultImageUrl);
        } else {
          console.log('Error in second POST request');
        }
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    if (displayMessage) {
      const timer = setTimeout(() => {
        setDisplayMessage(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [displayMessage]);

  return (
    <main className="container mx-auto p-4 relative">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-style"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-style"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="input-style"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="input-style"
          />
        </div>
        {cloudinaryUrl && <Image cloudName={cloudName} publicId={cloudinaryUrl} />}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {displayMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded">
          <p>{displayMessage.message}</p>
          {resultImageUrl && <Image cloudName={cloudName} publicId={resultImageUrl} />}
        </div>
      )}
    </main>
  );
}
