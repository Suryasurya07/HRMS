import React, { useEffect, useState } from 'react';

const Guidelines = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        fetch('/backend/officeGuidelines.json')
            .then((response) => response.json())
            .then((data) => setRules(data))
            .catch((error) => console.error('Error loading rules:', error));
    }, []);

    return (
        <div className="guidelines-container p-4  min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Office Rules and Regulations</h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {rules.map((section, index) => (
                    <div
                        key={index}
                         className="rule-card bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-200"
                    >
                       <h2 className="text-2xl font-semibold text-white mb-4">

                            {index + 1}. {section.section}
                        </h2>
                        <ol className="list-decimal list-inside space-y-3">
                            {section.rules.map((rule, idx) => (
                                <li key={idx} className="text-white leading-relaxed">
                                    <span className="font-semibold text-white">{rule.title}: </span>
                                    {rule.description}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guidelines;
