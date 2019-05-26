
export interface Place {
    city_iata?: string;
    city?: string;
    country: string;
    iata: string;
    name: string;
    type: 'airport' | 'city';
}

export const placeDescription = ({ country, name }: Place): string => `${name}, ${country}`
