import { Province } from '../types';

// List of Polish voivodeships with their neighbors
export const provinces: Province[] = [
  {
    id: 'dolnoslaskie',
    name: 'Dolnośląskie',
    neighbors: ['lubuskie', 'wielkopolskie', 'opolskie']
  },
  {
    id: 'kujawsko-pomorskie',
    name: 'Kujawsko-pomorskie',
    neighbors: ['pomorskie', 'warminsko-mazurskie', 'mazowieckie', 'wielkopolskie']
  },
  {
    id: 'lubelskie',
    name: 'Lubelskie',
    neighbors: ['podlaskie', 'mazowieckie', 'swietokrzyskie', 'podkarpackie']
  },
  {
    id: 'lubuskie',
    name: 'Lubuskie',
    neighbors: ['zachodniopomorskie', 'wielkopolskie', 'dolnoslaskie']
  },
  {
    id: 'lodzkie',
    name: 'Łódzkie',
    neighbors: ['wielkopolskie', 'opolskie', 'slaskie', 'swietokrzyskie', 'mazowieckie']
  },
  {
    id: 'malopolskie',
    name: 'Małopolskie',
    neighbors: ['slaskie', 'swietokrzyskie', 'podkarpackie']
  },
  {
    id: 'mazowieckie',
    name: 'Mazowieckie',
    neighbors: ['warminsko-mazurskie', 'podlaskie', 'lubelskie', 'swietokrzyskie', 'lodzkie', 'kujawsko-pomorskie']
  },
  {
    id: 'opolskie',
    name: 'Opolskie',
    neighbors: ['dolnoslaskie', 'wielkopolskie', 'lodzkie', 'slaskie']
  },
  {
    id: 'podkarpackie',
    name: 'Podkarpackie',
    neighbors: ['malopolskie', 'swietokrzyskie', 'lubelskie']
  },
  {
    id: 'podlaskie',
    name: 'Podlaskie',
    neighbors: ['warminsko-mazurskie', 'mazowieckie', 'lubelskie']
  },
  {
    id: 'pomorskie',
    name: 'Pomorskie',
    neighbors: ['zachodniopomorskie', 'wielkopolskie', 'kujawsko-pomorskie', 'warminsko-mazurskie']
  },
  {
    id: 'slaskie',
    name: 'Śląskie',
    neighbors: ['opolskie', 'lodzkie', 'swietokrzyskie', 'malopolskie']
  },
  {
    id: 'swietokrzyskie',
    name: 'Świętokrzyskie',
    neighbors: ['mazowieckie', 'lodzkie', 'slaskie', 'malopolskie', 'podkarpackie', 'lubelskie']
  },
  {
    id: 'warminsko-mazurskie',
    name: 'Warmińsko-mazurskie',
    neighbors: ['pomorskie', 'kujawsko-pomorskie', 'mazowieckie', 'podlaskie']
  },
  {
    id: 'wielkopolskie',
    name: 'Wielkopolskie',
    neighbors: ['zachodniopomorskie', 'lubuskie', 'dolnoslaskie', 'opolskie', 'lodzkie', 'kujawsko-pomorskie', 'pomorskie']
  },
  {
    id: 'zachodniopomorskie',
    name: 'Zachodniopomorskie',
    neighbors: ['pomorskie', 'wielkopolskie', 'lubuskie']
  }
];