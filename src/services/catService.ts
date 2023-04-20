import axios from 'axios';
import { Cat, Breed } from '../types/Cat';

const API_KEY = 'live_pRCDY6OLrYD5t1Qq5jMEuJDDdlJ4pvLvZG2dA6H1YCRchpYcVwfNyyxNxQesU0T1';
const BASE_URL = 'https://api.thecatapi.com/v1';


export async function fetchCatsByBreed(breedId: string, page: number): Promise<Cat[]> {
    console.log(breedId);
    
  try {
    const response = await axios.get(`${BASE_URL}/images/search`, {
      params: {
        breed_id: breedId,
        page,
        limit: 10,
      },
      headers: {
        'x-api-key': API_KEY,
      },
    });    
    return response.data;
  } catch (error) {
    throw new Error('Apologies but we could not load new cats for you at this time! Miau!');
  }
}

export async function fetchBreedById(breedId: string): Promise<Breed> {
  try {
    const response = await axios.get(`${BASE_URL}/breeds/${breedId}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Apologies but we could not load new cats for you at this time! Miau!');
  }
}
