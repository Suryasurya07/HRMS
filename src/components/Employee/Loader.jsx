// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="loader">Loading...</div> {/* You can style this as needed */}
            <style jsx>{`
                .loader {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #000;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;
