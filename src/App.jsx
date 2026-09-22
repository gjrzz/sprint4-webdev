import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import CameraScreen from './components/CameraScreen';
import SobreScreen from './components/SobreScreen';
import EquipeScreen from './components/EquipeScreen';
import { useNomeUsuario } from './hooks/useNomeUsuario';

/**
 * Componente raiz — "pai" de toda a árvore.
 * Controla qual tela está ativa (SPA por estado, sem React Router)
 * e guarda o nome do usuário (persistido via localStorage).
 */
export default function App() {
  const [tela, setTela] = useState('login');
  const [nome, setNome] = useNomeUsuario();

  function handleEntrar(nomeCapturado) {
    setNome(nomeCapturado);
    setTela('camera');
  }

  if (tela === 'login') {
    return <LoginScreen onEntrar={handleEntrar} />;
  }

  if (tela === 'sobre') {
    return <SobreScreen telaAtual={tela} onTrocarTela={setTela} />;
  }

  if (tela === 'equipe') {
    return <EquipeScreen telaAtual={tela} onTrocarTela={setTela} />;
  }

  return (
    <CameraScreen
      nome={nome}
      onSalvarNome={setNome}
      telaAtual={tela}
      onTrocarTela={setTela}
    />
  );
}