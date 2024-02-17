"use client"
import { useState } from 'react';
import { Image } from 'cloudinary-react';
import { CldUploadWidget} from 'next-cloudinary';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; 
export default function Home() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [image, setImage] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null); 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("file",file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ss-images'); 
    console.log("formData",formData)
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
    console.log('name', name);
    console.log('location', location);
    console.log('mobileNumber', mobileNumber);
    console.log('image', cloudinaryUrl); 

    try {
      const response = await fetch('/api/saveUserData', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, mobileNumber, image: cloudinaryUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
      } else {
        console.log("Error");
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
        {cloudinaryUrl && <Image cloudName={cloudName} publicId={cloudinaryUrl} />}
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
