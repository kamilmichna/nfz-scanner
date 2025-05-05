import React from "react";
import { AppointmentProvider } from "../types";
import ResultItem from "./ResultItem";
import { ArrowDownIcon, CalendarIcon, MapPinIcon } from "lucide-react";

interface ResultsListProps {
  appointments: AppointmentProvider[];
  isLoading: boolean;
  error: string | null;
  sortBy: "date" | "distance";
  onSortChange: (sort: "date" | "distance") => void;
}

const ResultsList: React.FC<ResultsListProps> = ({
  appointments,
  isLoading,
  error,
  sortBy,
  onSortChange,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Wyszukiwanie terminów...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 mb-2">Błąd</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">
          Nie znaleziono terminów dla wybranych kryteriów. Spróbuj zmienić
          parametry wyszukiwania.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          Znaleziono {appointments.length} terminów
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onSortChange("date")}
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              sortBy === "date"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <CalendarIcon className="mr-1 h-4 w-4" />
            Najwcześniejsze
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((appointment) => (
          <ResultItem key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
