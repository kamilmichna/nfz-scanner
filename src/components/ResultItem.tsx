import React from "react";
import { AppointmentProvider } from "../types";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  BuildingIcon,
  Dumbbell,
  Car,
  ArrowBigUpDash,
  Bath,
} from "lucide-react";

interface ResultItemProps {
  appointment: AppointmentProvider;
}

const ResultItem: React.FC<ResultItemProps> = ({ appointment }) => {
  // Format the date to Polish format (DD.MM.YYYY)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL");
  };

  // Calculate days until appointment
  const calculateDaysUntil = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(dateString);
    const diffTime = appointmentDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntil = calculateDaysUntil(appointment.earliestDate);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-blue-500">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">
            {appointment.provider}
          </h3>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {formatDate(appointment.earliestDate)}
            </span>
            <span className="text-sm text-gray-500 mt-1">
              {daysUntil === 0
                ? "Dziś"
                : daysUntil === 1
                ? "Jutro"
                : `Za ${daysUntil} dni`}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="mr-2 h-5 w-5 text-gray-400" />
            <span>
              {appointment.address}
              {appointment.city ? `, ${appointment.city}` : ""}
            </span>
          </div>

          {appointment.contact && (
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="mr-2 h-5 w-5 text-gray-400" />
              <span>{appointment.contact}</span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <BuildingIcon className="mr-2 h-5 w-5 text-gray-400" />
            <span>Specjalizacja: {appointment.specialty}</span>
          </div>

          {appointment.attributes && (
            <>
              {/* Accessibility features */}
              <div className="flex items-center space-x-2 mt-2">
                {appointment.attributes.ramp === "Y" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    <Dumbbell className="mr-1 h-3 w-3" />
                    Podjazd
                  </span>
                )}
                {appointment.attributes.car_park === "Y" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    <Car className="mr-1 h-3 w-3" />
                    Parking
                  </span>
                )}
                {appointment.attributes.elevator === "Y" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    <ArrowBigUpDash className="mr-1 h-3 w-3" />
                    Winda
                  </span>
                )}
                {appointment.attributes.toilet === "Y" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    <Bath className="mr-1 h-3 w-3" />
                    Toaleta
                  </span>
                )}
              </div>

              {/* Statistics */}
              {appointment.attributes.statistics.provider_data && (
                <div className="mt-2 text-sm text-gray-500">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      Oczekujących:{" "}
                      {appointment.attributes.statistics.provider_data.awaiting}
                    </div>
                    <div>
                      Średni czas oczekiwania:{" "}
                      {
                        appointment.attributes.statistics.provider_data
                          .average_period
                      }{" "}
                      dni
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
