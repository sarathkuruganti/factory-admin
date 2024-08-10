import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

export function AddConsumedMaterial () {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantityToUse, setQuantityToUse] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchRawMaterials = async () => {
      const querySnapshot = await getDocs(collection(db, 'rawMaterials'));
      const materials = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRawMaterials(materials);
    };

    fetchRawMaterials();
  }, []);

  const handleMaterialChange = (e) => {
    const materialId = e.target.value;
    setSelectedMaterialId(materialId);
    const material = rawMaterials.find(m => m.id === materialId);
    setSelectedMaterial(material);
  };

  const handleUseChange = (e) => {
    setQuantityToUse(e.target.value);
  };

  const extractNumber = (quantity) => {
    const result = quantity.match(/\d+/);
    return result ? parseInt(result[0], 10) : NaN;
  };

  const extractUnit = (quantity) => {
    const result = quantity.match(/[a-zA-Z]+/);
    return result ? result[0] : '';
  };

  const handleUse = async (e) => {
    e.preventDefault();
    const usedQuantity = parseInt(quantityToUse, 10);
    const availableQuantity = extractNumber(selectedMaterial.quantity);
    const unit = extractUnit(selectedMaterial.quantity);

    if (!isNaN(usedQuantity) && usedQuantity > 0 && usedQuantity <= availableQuantity) {
      const newQuantity = availableQuantity - usedQuantity;
      const newQuantityWithUnit = `${newQuantity} ${unit}`;
      const materialDoc = doc(db, 'rawMaterials', selectedMaterial.id);

      await updateDoc(materialDoc, { quantity: newQuantityWithUnit });

      // Save used quantity to consumedRawMaterials collection
      const consumedMaterialDoc = doc(db, 'consumedRawMaterials', selectedMaterial.id);
      const consumedMaterialSnapshot = await getDoc(consumedMaterialDoc);

      if (consumedMaterialSnapshot.exists()) {
        const currentConsumed = consumedMaterialSnapshot.data().consumed;
        await updateDoc(consumedMaterialDoc, { consumed: `${extractNumber(currentConsumed) + usedQuantity} ${unit}` });
      } else {
        await setDoc(consumedMaterialDoc, { material: selectedMaterial.material, consumed: `${usedQuantity} ${unit}` });
      }

      setRawMaterials(rawMaterials.map(m => (m.id === selectedMaterial.id ? { ...m, quantity: newQuantityWithUnit } : m)));
      setSelectedMaterialId('');
      setSelectedMaterial(null);
      setQuantityToUse('');
      setErrorMessages({});
    } else {
      setErrorMessages({ [selectedMaterial.id]: `Invalid quantity entered. Please enter a value between 1 and ${availableQuantity}.` });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Consume Raw Materials</h2>
      <form onSubmit={handleUse} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="material-select" className="mb-1 text-sm font-medium text-gray-700">Select Material</label>
          <select
            id="material-select"
            value={selectedMaterialId}
            onChange={handleMaterialChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">--Select Material--</option>
            {rawMaterials.map(material => (
              <option key={material.id} value={material.id}>
                {material.material}
              </option>
            ))}
          </select>
        </div>
        {selectedMaterial && (
          <>
            <div className="flex flex-col">
              <label htmlFor="available-quantity" className="mb-1 text-sm font-medium text-gray-700">Available Quantity</label>
              <input
                type="text"
                id="available-quantity"
                value={selectedMaterial.quantity}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity-to-use" className="mb-1 text-sm font-medium text-gray-700">Use Quantity</label>
              <input
                type="number"
                id="quantity-to-use"
                value={quantityToUse}
                onChange={handleUseChange}
                required
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Consume
            </button>
            {errorMessages[selectedMaterial.id] && (
              <div className="mt-2 text-red-500">{errorMessages[selectedMaterial.id]}</div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default AddConsumedMaterial;
