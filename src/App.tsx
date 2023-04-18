import { BrowserRouter, Route, Routes } from 'react-router-dom'

import React from 'react';

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Cadastro from './pages/Cadastro/Cadastro';
import './App.css'
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/cadastro' element={<Cadastro/>}/>
            <Route path='/temas' element={<ListaTemas/>}/>
            <Route path='/posts' element={<ListaPostagem/>}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
