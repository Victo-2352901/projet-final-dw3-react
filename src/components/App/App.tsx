import { useState } from 'react';
import ConnectionProvider, { ConnectionContext } from '../../contexts/ConnectionContext';
import AjouterMoto from '../AjouterMoto/AjouterMoto';
import Connexion from '../Connexion';
import Inventaire from '../Inventaire'
import ModifierMoto from '../ModifierMoto/ModifierMoto';
import TopBar from '../TopBar'
import './App.css'

import Francais from '../../lang/fr.json';
import Anglais from '../../lang/en.json';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
} from 'react-router-dom';
import InternationalisationProvider from '../../contexts/LangueContext';


function App() {
  const login = false; // À modifier pour gérer l'état de connexion

  return (
    <>
      <InternationalisationProvider>
          <ConnectionProvider >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Inventaire />}/>
                <Route index element={<Inventaire />} />
                <Route path="ajouter-moto" element={<AjouterMoto />} />
                <Route path="modifier-moto/:motoId" element={<ModifierMoto />} />
                <Route path="authentification" element={<Connexion />} />
              </Routes>
            </BrowserRouter>
          </ConnectionProvider>
      </InternationalisationProvider>

    </>
  )
}

export default App
