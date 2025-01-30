import React from 'react';

const CountryFlag = ({ code, text, label = "Country", size = 24, showText = true }) => {
  // Map 'en' to 'gb' for the flag, otherwise use the original code
  const countryCode = code.toLowerCase() === 'en' ? 'gb' : code.toLowerCase();

  return (
    <li className="flex gap-2 items-center">
      <span className="font-medium flex items-center gap-2">
        {label}:
        <img
          src={`https://flagcdn.com/${countryCode}.svg`}
          width={size}
          height={size}
          alt={`${code} flag`}
          className="object-cover rounded-sm"
        />
      </span>
      {showText && text}
    </li>
  );
};

export default CountryFlag;