// components/legal/TermsOfService.tsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import termsMd from '@/pages/legal/terms-of-service.md'

const TermsOfService = () => {
    const [terms, setTerms] = useState('');

    useEffect(() => {
        // Import the markdown file
        import(termsMd)
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

export default TermsOfService;