// src/components/SplashScreen.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            scale: [0.8, 1.2, 1],           // Start with a slight pop
            rotate: [0, 360],               // Full 360 rotation
            opacity: [0, 1, 1, 0],          // Fade in and out
            filter: ['blur(8px)', 'blur(0px)'], // Blur effect at the start and end
            transition: {
                duration: 3,               // Total animation duration
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]    // Control timing for each effect stage
            },
        }).then(() => {
            controls.start({
                scale: 1,
                rotate: 0,
                opacity: 1,
                filter: 'blur(0px)',
                transition: { duration: 0 } // Instant transition for the reset
            }).then(() => {
                onFinish(); // Callback to hide splash screen after animation
            });
        });
    }, [controls, onFinish]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50"
            initial={{ opacity: 0 }}
            animate={controls}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 w-40 h-40"
            />
            <motion.img
                src="/Design.png" /* Replace with your logo path */
                alt="Company Logo"
                className="w-52 h-52" /* Adjust the size of the logo */
                initial={{ scale: 1, filter: 'blur(0px)' }}
                animate={{ scale: [1, 1.05, 1], opacity: [1, 1, 1] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                style={{ filter: 'none' }}
            />
        </motion.div>
    );
};

export default SplashScreen;
