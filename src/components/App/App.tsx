import ConnectionProvider from '../../contexts/ConnectionContext';
import AjouterMoto from '../AjouterMoto/AjouterMoto';
import Connexion from '../Connexion';
import Inventaire from '../Inventaire'
import ModifierMoto from '../ModifierMoto/ModifierMoto';
import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import InternationalisationProvider from '../../contexts/LangueContext';


function App() {

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
