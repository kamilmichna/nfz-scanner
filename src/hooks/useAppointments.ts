import { useState, useEffect } from 'react';
import { AppointmentProvider, SearchParams } from '../types';
import { fetchAppointments } from '../services/api';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentProvider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'distance'>('date');

  const searchAppointments = async (params: SearchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchAppointments(params);
      
      // Sort the appointments based on sortBy value
      const sortedData = sortAppointments(data, sortBy);
      setAppointments(sortedData);
    } catch (err) {
      setError('Wystąpił błąd podczas wyszukiwania terminów. Spróbuj ponownie później.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sortAppointments = (data: AppointmentProvider[], sort: 'date' | 'distance'): AppointmentProvider[] => {
    if (sort === 'date') {
      return [...data].sort((a, b) => 
        new Date(a.earliestDate).getTime() - new Date(b.earliestDate).getTime()
      );
    }
    
    // For distance sorting, we would need geolocation
    // This is a placeholder for now
    return data;
  };

  const updateSort = (newSortBy: 'date' | 'distance') => {
    setSortBy(newSortBy);
    setAppointments(sortAppointments(appointments, newSortBy));
  };

  return {
    appointments,
    isLoading,
    error,
    searchAppointments,
    sortBy,
    updateSort
  };
};