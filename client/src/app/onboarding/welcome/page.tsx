'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Welcome = () => {
    useEffect(() => {
        // Trigger confetti on component mount
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 transition duration-500"
        >
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Congratulations!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    You've successfully joined our community. Let’s embark on this exciting journey together!
                </p>
                <button
                    onClick={() => {
                        // Trigger additional confetti when the button is clicked
                        confetti({
                            particleCount: 100,
                            spread: 60,
                            origin: { y: 0.7 }
                        });
                    }}
                    className="px-8 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
                >
                    Get Started
                </button>
            </div>
        </motion.div>
    );
};

export default Welcome;
