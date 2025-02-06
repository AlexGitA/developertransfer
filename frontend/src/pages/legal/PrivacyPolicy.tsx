// components/legal/TermsOfService.tsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import policyMd from '@/pages/legal/privacy-policy.md'

const PrivacyPolicy = () => {
    const [terms, setTerms] = useState('');

    useEffect(() => {
        // Import the markdown file
        import(policyMd)
            .then(res => {
                fetch(res.default)
                    .then(response => response.text())
                    .then(text => {
                        setTerms(text);
                    });
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="prose prose-blue max-w-none">
                <ReactMarkdown>{terms}</ReactMarkdown>
            </div>
        </div>
    );
};

export default PrivacyPolicy;