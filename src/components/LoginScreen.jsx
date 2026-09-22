import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatarNome, emailValido } from '../utils/validation';

/**
 * Tela de login. Portada de login.html + fazerLogin()/iniciarToggleSenha()
 * do script.js original. Em vez de window.location.href, salva o nome via
 * onEntrar() e navega pra /camera com react-router-dom.
 */
export default function LoginScreen({ onEntrar }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState({ email: '', senha: '' });

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = { email: '', senha: '' };
    let temErro = false;

    if (!email.trim()) {
      novosErros.email = 'Digite seu e-mail.';
      temErro = true;
    } else if (!emailValido(email)) {
      novosErros.email = 'E-mail inválido.';
      temErro = true;
    }

    if (!senha.trim()) {
      novosErros.senha = 'Digite sua senha.';
      temErro = true;
    } else if (senha.length < 4) {
      novosErros.senha = 'Senha muito curta.';
      temErro = true;
    }

    setErros(novosErros);

    if (temErro) {
      alert('⚠️ Corrija os campos antes de continuar.');
      return;
    }

    const nome = formatarNome(usuario) || formatarNome(email.split('@')[0]);
    onEntrar(nome);
    navigate('/camera');
  }

  return (
    <div className="login-page">
      <div className="math-bg" aria-hidden="true">
        <span className="math-symbol" style={{ '--delay': '0s', '--x': '10%', '--size': '1.2rem' }}>∫</span>
        <span className="math-symbol" style={{ '--delay': '1s', '--x': '25%', '--size': '2rem' }}>π</span>
        <span className="math-symbol" style={{ '--delay': '2s', '--x': '40%', '--size': '1rem' }}>Σ</span>
        <span className="math-symbol" style={{ '--delay': '0.5s', '--x': '60%', '--size': '1.5rem' }}>√</span>
        <span className="math-symbol" style={{ '--delay': '1.5s', '--x': '75%', '--size': '0.9rem' }}>∞</span>
        <span className="math-symbol" style={{ '--delay': '3s', '--x': '88%', '--size': '1.8rem' }}>Δ</span>
        <span className="math-symbol" style={{ '--delay': '2.5s', '--x': '50%', '--size': '1.1rem' }}>θ</span>
        <span className="math-symbol" style={{ '--delay': '4s', '--x': '5%', '--size': '2.2rem' }}>λ</span>
        <span className="math-symbol" style={{ '--delay': '3.5s', '--x': '92%', '--size': '1.4rem' }}>α</span>
      </div>

      <main className="relative z-[2] w-full max-w-[420px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="glass-card px-5 py-7 sm:px-8 sm:py-9">
          <div className="login-brand">
            <div className="brand-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect width="40" height="40" rx="12" fill="#007AFF" />
                <text x="20" y="27" textAnchor="middle" fontSize="18" fontWeight="700" fill="white" fontFamily="system-ui">∑</text>
              </svg>
            </div>
            <h1 className="brand-name">JOVI <span className="brand-accent">Math</span></h1>
            <p className="brand-tagline">Resolução passo a passo com IA</p>
          </div>

          <form className="login-form" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">E-mail</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,12 2,6" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className="form-error" role="alert" aria-live="polite">{erros.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Senha</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-required="true"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setMostrarSenha((v) => !v)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
              <span className="form-error" role="alert" aria-live="polite">{erros.senha}</span>
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Seu nome <span className="form-hint">(para personalizar a experiência)</span>
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder="Ex: Lucas"
                  autoComplete="name"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary btn-login">
              <span className="btn-text">Entrar</span>
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-label">Credenciais de demo</p>
            <code className="demo-code">email: gabrieljuarez@fiap.com.br &nbsp;|&nbsp; senha: 123456</code>
          </div>
        </div>
      </main>
    </div>
  );
}