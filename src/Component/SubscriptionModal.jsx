import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleSubscription } from '../store/slices/userSlice';

const SubscriptionModal = ({ isOpen, onClose, username }) => {
  const dispatch = useDispatch();
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentStep, setPaymentStep] = useState('tiers'); // tiers, payment, confirmation

  const subscriptionTiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: 4.99,
      duration: 'month',
      benefits: [
        'Access to all public posts',
        'HD video quality',
        'Comment on posts'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      duration: 'month',
      benefits: [
        'All Basic features',
        'Exclusive content',
        'Priority support',
        'Ad-free experience'
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 24.99,
      duration: 'month',
      benefits: [
        'All Premium features',
        'Personal training sessions',
        'Custom workout plans',
        'Direct messaging',
        'Early access to content'
      ]
    }
  ];

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setPaymentStep('payment');
  };

  const handlePayment = () => {
    // Here you would typically integrate with a payment processor
    dispatch(toggleSubscription(username));
    setPaymentStep('confirmation');
  };

  const handleClose = () => {
    setSelectedTier(null);
    setPaymentStep('tiers');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {paymentStep === 'tiers' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Subscription</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {subscriptionTiers.map((tier) => (
                    <motion.div
                      key={tier.id}
                      className="border border-gray-600 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectTier(tier)}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                      <p className="text-3xl font-bold text-blue-500 mb-4">
                        ${tier.price}
                        <span className="text-sm text-gray-400">/{tier.duration}</span>
                      </p>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="text-gray-300 flex items-center">
                            <span className="mr-2">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {paymentStep === 'payment' && selectedTier && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-white mb-2">Selected Plan: {selectedTier.name}</p>
                    <p className="text-2xl font-bold text-blue-500">
                      ${selectedTier.price}/{selectedTier.duration}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <motion.button
                      onClick={handlePayment}
                      className="w-full bg-blue-600 text-white rounded-lg py-3 font-bold hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Subscribe Now
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {paymentStep === 'confirmation' && (
              <div className="p-6 text-center">
                <div className="mb-6 text-6xl">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-gray-300 mb-6">Your subscription has been activated successfully.</p>
                <motion.button
                  onClick={handleClose}
                  className="bg-blue-600 text-white rounded-lg px-6 py-3 font-bold hover:bg-blue-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Done
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;