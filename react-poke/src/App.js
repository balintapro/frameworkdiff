import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';
import Deatils from './components/Deatils';
import Footer from './components/Footer';

import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/:name' element={<Deatils />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
