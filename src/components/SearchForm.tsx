import React, { useState } from "react";
import { SearchParams } from "../types";
import { provinces } from "../data/provinces";
import { specialties } from "../data/specialties";
import { SearchIcon, MapPinIcon, UserIcon } from "lucide-react";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [useCustomSpecialty, setUseCustomSpecialty] = useState<boolean>(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [customSpecialty, setCustomSpecialty] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [includeNeighbors, setIncludeNeighbors] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    specialty?: string;
    province?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: { specialty?: string; province?: string } = {};
    const specialtyValue = useCustomSpecialty
      ? customSpecialty
      : selectedSpecialty;

    if (!specialtyValue.trim()) {
      newErrors.specialty = "Wpisz lub wybierz nazwę świadczenia";
    }

    if (!province) {
      newErrors.province = "Wybierz województwo";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});

    // Submit search
    onSearch({
      specialty: specialtyValue.trim().toUpperCase(),
      province,
      includeNeighbors,
    });
  };

  const handleSpecialtyToggle = () => {
    setUseCustomSpecialty(!useCustomSpecialty);
    // Clear both fields when switching modes
    setSelectedSpecialty("");
    setCustomSpecialty("");
    // Clear any specialty-related errors
    setErrors((prev) => ({ ...prev, specialty: undefined }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Znajdź najbliższy termin wizyty NFZ
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Nazwa świadczenia
              </label>
              <button
                type="button"
                onClick={handleSpecialtyToggle}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {useCustomSpecialty ? "Wybierz z listy" : "Wpisz własną nazwę"}
              </button>
            </div>

            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              {useCustomSpecialty ? (
                <input
                  type="text"
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  placeholder="np. PORADNIA STOMATOLOGICZNA"
                  className={`pl-10 block w-full border ${
                    errors.specialty ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              ) : (
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className={`pl-10 block w-full border ${
                    errors.specialty ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Wybierz świadczenie</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {errors.specialty && (
              <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>
            )}
            {useCustomSpecialty && (
              <p className="mt-1 text-sm text-gray-500">
                Wpisz dokładną nazwę świadczenia, np. PORADNIA STOMATOLOGICZNA
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Województwo
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className={`pl-10 block w-full border ${
                  errors.province ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Wybierz województwo</option>
                {provinces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.province && (
              <p className="mt-1 text-sm text-red-600">{errors.province}</p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeNeighbors"
            checked={includeNeighbors}
            onChange={(e) => setIncludeNeighbors(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="includeNeighbors"
            className="ml-2 block text-sm text-gray-700"
          >
            Uwzględnij sąsiednie województwa
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Wyszukiwanie...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-5 w-5" />
                Wyszukaj terminy
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
