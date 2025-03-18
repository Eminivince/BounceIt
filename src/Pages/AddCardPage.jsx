import React, { useState } from 'react';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';

const AddCardPage = () => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!cardData.cardHolder.trim()) {
      newErrors.cardHolder = 'Cardholder name is required';
    }
    
    if (!cardData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    
    if (!cardData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCard()) {
      // Handle card submission
      console.log('Card validated successfully:', cardData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AsideNav />
      
      <main className="flex-1 ml-64 mr-80">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Add Payment Card</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardData.cardHolder}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.cardHolder && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Card
              </button>
            </form>
          </div>
        </div>
      </main>

      <RightSection />
    </div>
  );
};

export default AddCardPage;