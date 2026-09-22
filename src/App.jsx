import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import CameraScreen from './components/CameraScreen';
import SobreScreen from './components/SobreScreen';
import EquipeScreen from './components/EquipeScreen';
import RotaPrivada from './components/RotaPrivada';
import { useNomeUsuario } from './hooks/useNomeUsuario';

/**
 * Componente raiz — "pai" de toda a árvore.
 * Roteamento real via react-router-dom: /login é pública,
 * /camera, /sobre e /equipe exigem usuário logado (RotaPrivada).
 */
export default function App() {
  const [nome, setNome] = useNomeUsuario();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen onEntrar={setNome} />} />

        <Route
          path="/camera"
          element={
            <RotaPrivada>
              <CameraScreen nome={nome} onSalvarNome={setNome} />
            </RotaPrivada>
          }
        />

        <Route
          path="/sobre"
          element={
            <RotaPrivada>
              <SobreScreen />
            </RotaPrivada>
          }
        />

        <Route
          path="/equipe"
          element={
            <RotaPrivada>
              <EquipeScreen />
            </RotaPrivada>
          }
        />

        <Route path="*" element={<Navigate to={nome ? '/camera' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
