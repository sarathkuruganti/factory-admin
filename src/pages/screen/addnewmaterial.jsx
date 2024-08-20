import React, { useState } from 'react';
import { db } from './../../../firebase'; // Ensure the path is correct
import { collection, addDoc } from 'firebase/firestore';

export function AddNewMaterials() {
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [dateBought, setDateBought] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rawMaterials'), {
        material,
        quantity,
        price,
        date: dateBought,
        description,
      });
      setSuccessMessage('Raw material added successfully!');
      console.log('Raw material added successfully!');
      setMaterial('');
      setQuantity('');
      setPrice('');
      setDateBought('');
      setDescription('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Raw Material</h2>
      {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="material" className="mb-1 text-sm font-medium text-gray-700">Material</label>
          <input
            type="text"
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-1 text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dateBought" className="mb-1 text-sm font-medium text-gray-700">Date Bought</label>
          <input
            type="date"
            id="dateBought"
            value={dateBought}
            onChange={(e) => setDateBought(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewMaterials;
