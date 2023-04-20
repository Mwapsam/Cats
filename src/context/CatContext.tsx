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
};

const CatContext = createContext<CatContextType>({
  cats: [],
  selectedBreed: '',
  setSelectedBreed: () => {},
  loadMoreCats: () => {},
  isLoading: false,
  error: null,
  handleSelectChange: () => {}
});

const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

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
      value={{ cats, selectedBreed, setSelectedBreed, loadMoreCats, isLoading, error, handleSelectChange }}
    >
      {children}
    </CatContext.Provider>
  );
};

const useCatContext = () => useContext(CatContext);

export { CatProvider, useCatContext };
