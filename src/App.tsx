import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, Nav, SingleCatPage } from "./components"
import { CatProvider } from './context/CatContext';

function App() {


  return (
    <CatProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cat/:id' element={<SingleCatPage />} />
      </Routes>
    </CatProvider>
  )
}

export default App
