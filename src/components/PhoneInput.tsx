
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, Phone } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', dialCode: '+1' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54' },
  { code: 'MX', name: 'México', flag: '🇲🇽', dialCode: '+52' },
  { code: 'ES', name: 'Espanha', flag: '🇪🇸', dialCode: '+34' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
  { code: 'FR', name: 'França', flag: '🇫🇷', dialCode: '+33' },
  { code: 'IT', name: 'Itália', flag: '🇮🇹', dialCode: '+39' },
  { code: 'DE', name: 'Alemanha', flag: '🇩🇪', dialCode: '+49' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧', dialCode: '+44' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryChange: (countryCode: string) => void;
  placeholder?: string;
}

const PhoneInput = ({ 
  value, 
  onChange, 
  countryCode, 
  onCountryChange, 
  placeholder = "Número de telefone" 
}: PhoneInputProps) => {
  const [showCountries, setShowCountries] = useState(false);
  
  const selectedCountry = countries.find(c => c.dialCode === countryCode) || countries[0];

  const handleCountrySelect = (country: Country) => {
    onCountryChange(country.dialCode);
    setShowCountries(false);
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative">
          <Button
            type="button"
            onClick={() => setShowCountries(!showCountries)}
            variant="outline"
            className="rounded-r-none border-r-0 bg-gray-900 border-gray-600 text-white hover:bg-gray-800 px-3"
          >
            <span className="text-lg mr-1">{selectedCountry.flag}</span>
            <span className="text-sm">{selectedCountry.dialCode}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          
          {showCountries && (
            <div className="absolute top-full left-0 z-50 w-64 bg-gray-900 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-800 text-white text-sm flex items-center"
                >
                  <span className="text-lg mr-2">{country.flag}</span>
                  <span className="mr-2">{country.dialCode}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="tel"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-l-none pl-10 bg-gray-900 border-gray-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
