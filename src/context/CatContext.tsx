import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cat } from '../types/Cat';
import { fetchCatsByBreed } from '../services/catService';

type CatContextType = {
  cats: Cat[];
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
  loadMoreCats: () => void;
  isLoading: boolean;
  error: Error | null;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  defaultImage: string
};

const CatContext = createContext<CatContextType>({
  cats: [],
  selectedBreed: '',
  setSelectedBreed: () => {},
  loadMoreCats: () => {},
  isLoading: false,
  error: null,
  handleSelectChange: () => {},
  defaultImage: ''
});

const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [defaultImage, setDefaultImage] = useState('');

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setIsLoading(true);
        const newCats = await fetchCatsByBreed(selectedBreed, page);
        
        setCats((prevCats) => [...prevCats, ...newCats]);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedBreed) {
      fetchCats();
    }
  }, [selectedBreed, page]);

  useEffect(() => {
    const fetchDefaultImage = async () => {
      try{
        setIsLoading(true);
        const response = await fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD');
        const data = await response.json();
        setDefaultImage(data.url);
      }catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
  }
    fetchDefaultImage();
  }, []);

  const loadMoreCats = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = event.target.value;
    setSelectedBreed(selectedBreed);
    setCats([]);
  };

  return (
    <CatContext.Provider
      value={{ cats, selectedBreed, setSelectedBreed, loadMoreCats, isLoading, error, handleSelectChange, defaultImage }}
    >
      {children}
    </CatContext.Provider>
  );
};

const useCatContext = () => useContext(CatContext);

export { CatProvider, useCatContext };
