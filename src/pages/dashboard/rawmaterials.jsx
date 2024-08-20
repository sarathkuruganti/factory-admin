import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './../../../firebase'; // Ensure the path is correct
import { collection, getDocs, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

export function RawMaterials() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ material: '', quantity: '', price: '', date: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRawMaterials = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'rawMaterials'));
      const materials = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRawMaterials(materials);
      setLoading(false);
    };

    fetchRawMaterials();
  }, []);

  const handleEdit = (material) => {
    setEditing(material.id);
    setFormData({
      material: material.material,
      quantity: material.quantity,
      price: material.price,
      date: material.date,
      description: material.description || ''
    });
  };

  const handleDelete = async (id) => {
    const materialToDelete = rawMaterials.find(material => material.id === id);
    const materialName = materialToDelete.material.toLowerCase();

    // Delete from rawMaterials collection
    await deleteDoc(doc(db, 'rawMaterials', id));

    // Delete from consumedRawMaterials collection
    const consumedQuery = query(collection(db, 'consumedRawMaterials'));
    const consumedSnapshot = await getDocs(consumedQuery);

    consumedSnapshot.forEach(async (doc) => {
      const consumedMaterial = doc.data();
      if (consumedMaterial.material.toLowerCase() === materialName) {
        await deleteDoc(doc.ref);
      }
    });

    // Update local state
    setRawMaterials(rawMaterials.filter(material => material.id !== id));
  };

  const handleSave = async (id) => {
    const materialDoc = doc(db, 'rawMaterials', id);
    await updateDoc(materialDoc, formData);
    setRawMaterials(rawMaterials.map(material => (material.id === id ? { id, ...formData } : material)));
    setEditing(null);
    setFormData({ material: '', quantity: '', price: '', date: '', description: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center hidden md:block">Raw Materials</h2>

      {/* Table for Desktop */}
      <div className="hidden md:block">
        <div className="min-w-full bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-6 bg-black text-white font-bold py-2">
            <div className="px-4">Material</div>
            <div className="px-4">Quantity</div>
            <div className="px-4">Price</div>
            <div className="px-4">Date Bought</div>
            <div className="px-4">Description</div>
            <div className="px-4">Actions</div>
          </div>
          {rawMaterials.map(material => (
            <div key={material.id} className="grid grid-cols-6 border-t border-gray-200">
              {editing === material.id ? (
                <>
                  <div className="px-4 py-2">
                    <input type="text" name="material" value={formData.material} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="px-4 py-2">
                    <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="px-4 py-2">
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="px-4 py-2">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="px-4 py-2">
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="px-4 py-2 flex items-center justify-center">
                    <PencilIcon onClick={() => handleSave(material.id)} className="text-black-500 hover:text-blue-700 w-6 h-6 cursor-pointer" />
                  </div>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 capitalize">{material.material}</div>
                  <div className="px-4 py-2">{material.quantity}</div>
                  <div className="px-4 py-2">₹{material.price}</div>
                  <div className="px-4 py-2">{new Date(material.date).toLocaleDateString()}</div>
                  <div className="px-4 py-2">{material.description || '__'}</div>
                  <div className="px-4 py-2 flex items-center justify-left space-x-4">
                    <PencilIcon onClick={() => handleEdit(material)} className="text-black-500 hover:text-blue-700 w-6 h-6 cursor-pointer" />
                    <TrashIcon onClick={() => handleDelete(material.id)} className="text-red-500 hover:text-red-700 w-6 h-6 cursor-pointer" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card Structure for Mobile */}
      <div className="md:hidden">
        {rawMaterials.map(material => (
          <div key={material.id} className="bg-white shadow-md rounded-lg mb-4 p-4 border border-gray-200">
            {editing === material.id ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Material</label>
                  <input type="text" name="material" value={formData.material} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Date Bought</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="flex items-center justify-center">
                  <PencilIcon onClick={() => handleSave(material.id)} className="text-black-500 hover:text-blue-700 w-6 h-6 cursor-pointer" />
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <span className="font-bold text-gray-800">Material:</span> {material.material}
                </div>
                <div className="mb-2">
                  <span className="font-bold text-gray-800">Quantity:</span> {material.quantity}
                </div>
                <div className="mb-2">
                  <span className="font-bold text-gray-800">Price:</span> ₹{material.price}
                </div>
                <div className="mb-2">
                  <span className="font-bold text-gray-800">Date Bought:</span> {new Date(material.date).toLocaleDateString()}
                </div>
                <div className="mb-2">
                  <span className="font-bold text-gray-800">Description:</span> {material.description || '__'}
                </div>
                <div className="flex items-center justify-left space-x-4 mt-4">
                  <PencilIcon onClick={() => handleEdit(material)} className="text-black-500 hover:text-blue-700 w-6 h-6 cursor-pointer" />
                  <TrashIcon onClick={() => handleDelete(material.id)} className="text-red-500 hover:text-red-700 w-6 h-6 cursor-pointer" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 flex space-x-4">
        <button
          onClick={() => navigate('/screen/addnewmaterials')}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 flex items-center justify-center space-x-2"
        >
          <PlusIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Add New</span>
        </button>
        <button
          onClick={() => navigate('/screen/addconsumedmaterial')}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 flex items-center justify-center space-x-2"
        >
          <PlusIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Consume</span>
        </button>
      </div>
    </div>
  );
}

export default RawMaterials;
