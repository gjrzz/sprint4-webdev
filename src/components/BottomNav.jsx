import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Navegação inferior. Antes eram <a href="pagina.html">,
 * depois viravam troca de tela via estado; agora navega de
 * verdade pela URL com react-router-dom.
 */
export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const itens = [
    {
      id: 'camera',
      label: 'Câmera',
      icone: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'sobre',
      label: 'Sobre',
      icone: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8h.01M12 12v4" />
        </svg>
      ),
    },
    {
      id: 'equipe',
      label: 'Equipe',
      icone: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {itens.map((item) => {
        const path = `/${item.id}`;
        const ativo = location.pathname === path;

        return (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${ativo ? 'active' : ''}`}
            aria-current={ativo ? 'page' : undefined}
            onClick={() => navigate(path)}
          >
            {item.icone}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}