import { useState } from 'react';
import StatusBar from './StatusBar';
import BottomNav from './BottomNav';
import BottomSheet from './BottomSheet';
import { resolverEquacao, formatarEquacao } from '../utils/math';
import { formatarNome } from '../utils/validation';

// Equação de demonstração (mesma do protótipo original)
const EQUACAO_DEMO = { a: 1, b: -5, c: 6 };

const NOMES_MODO = {
  video: 'VÍDEO',
  photo: 'FOTO',
  math: 'MATH',
  portrait: 'RETRATO',
};

/**
 * Tela principal (câmera). Portada de index.html +
 * iniciarCamera()/iniciarBottomSheet()/iniciarConfiguracoes()/iniciarBotaoCopiar().
 */
export default function CameraScreen({ nome, onSalvarNome }) {
  const [modo, setModo] = useState('photo');
  const [sheetAberto, setSheetAberto] = useState(false);

  const modoMath = modo === 'math';
  const resolucao = resolverEquacao(EQUACAO_DEMO.a, EQUACAO_DEMO.b, EQUACAO_DEMO.c);
  const equacaoTexto = formatarEquacao(EQUACAO_DEMO.a, EQUACAO_DEMO.b, EQUACAO_DEMO.c);

  function abrirSheet() {
    if (!modoMath) return;
    setSheetAberto(true);
  }

  function handleConfiguracoes() {
    const novoNome = prompt('Qual é o seu nome?');

    if (novoNome === null) return;

    if (!novoNome.trim()) {
      alert('⚠️ Digite um nome válido.');
      return;
    }

    const nomeFormatado = formatarNome(novoNome);
    onSalvarNome(nomeFormatado);
    alert(`✅ Nome atualizado para ${nomeFormatado}`);
  }

  const saudacao = nome
    ? `Olá, ${formatarNome(nome)}, bem-vindo ao JOVI Math!`
    : 'Bem-vindo ao JOVI Math! 📐';

  return (
    <div className="simulator-page">
      <div className="phone-frame" role="main">
        <StatusBar />

        <div className={`camera-viewfinder ${modoMath ? 'math-mode' : ''}`} aria-label="Visualizador da câmera">
          <div className={`scanner-overlay ${modoMath ? 'active' : ''}`} aria-hidden="true">
            <div className="scan-corner tl"></div>
            <div className="scan-corner tr"></div>
            <div className="scan-corner bl"></div>
            <div className="scan-corner br"></div>
            <div className="scan-line"></div>
          </div>

          <div className={`equation-card glass-card ${modoMath ? 'active' : ''}`} aria-label="Equação detectada">
            <p className="equation-label">Equação detectada</p>
            <p className="equation-text">{equacaoTexto}</p>
          </div>

          <header className="camera-header glass-card">
            <button className="icon-btn" aria-label="Flash">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </button>
            <h2 className="camera-title">{NOMES_MODO[modo]}</h2>
            <button className="icon-btn" aria-label="Configurações" onClick={handleConfiguracoes}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </header>

          <div className="user-greeting glass-card" aria-live="polite">
            <span>{saudacao}</span>
          </div>
        </div>

        <div className="camera-controls">
          <div className="capture-area">
            <button className="thumbnail-btn" aria-label="Galeria">
              <div className="thumbnail-placeholder"></div>
            </button>

            <button className="capture-btn" aria-label="Capturar equação" onClick={abrirSheet}>
              <div className="capture-ring"></div>
              <div className="capture-inner"></div>
            </button>

            <button className="icon-btn flip-btn" aria-label="Virar câmera">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
              </svg>
            </button>
          </div>

          <nav className="mode-selector" role="tablist" aria-label="Modos da câmera">
            {Object.entries(NOMES_MODO).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`mode-btn ${id === 'math' ? 'mode-btn--math' : ''}`}
                role="tab"
                aria-selected={modo === id}
                onClick={() => setModo(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <BottomSheet
          aberto={sheetAberto}
          resolucao={resolucao}
          onFechar={() => setSheetAberto(false)}
        />

        <BottomNav />
      </div>
    </div>
  );
}