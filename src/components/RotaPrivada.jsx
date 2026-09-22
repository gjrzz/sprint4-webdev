import { Navigate } from 'react-router-dom';
import { useNomeUsuario } from '../hooks/useNomeUsuario';

/**
 * Protege rotas que exigem um usuário logado (nome salvo no localStorage).
 * Sem nome, redireciona pra /login.
 */
export default function RotaPrivada({ children }) {
  const [nome] = useNomeUsuario();

  if (!nome) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
