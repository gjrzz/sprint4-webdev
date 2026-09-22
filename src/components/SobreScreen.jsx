import StatusBar from './StatusBar';
import BottomNav from './BottomNav';
import Slideshow from './Slideshow';

/** Tela "Sobre". Portada de sobre.html. */
export default function SobreScreen({ telaAtual, onTrocarTela }) {
  return (
    <div className="sobre-page">
      <div className="phone-frame" role="main">
        <StatusBar />

        <div className="page-scroll-content">
          <section className="sobre-hero">
            <div className="sobre-hero-icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                <rect width="56" height="56" rx="16" fill="#007AFF" />
                <text x="28" y="37" textAnchor="middle" fontSize="26" fontWeight="700" fill="white" fontFamily="system-ui">∑</text>
              </svg>
            </div>
            <h1 className="sobre-title">JOVI <span className="brand-accent">Math</span></h1>
            <p className="sobre-subtitle">Resolução inteligente de equações pela câmera do seu celular</p>
          </section>

          <section className="sobre-section" aria-labelledby="about-heading">
            <h2 className="section-heading" id="about-heading">O que é?</h2>
            <p className="section-text">
              O <strong>JOVI Math</strong> é uma funcionalidade nativa de câmera impulsionada pela IA <strong>Gemini</strong>.
              Usando OCR (Reconhecimento Ótico de Caracteres), ele lê equações matemáticas diretamente do seu caderno e
              retorna um painel completo com a resolução passo a passo — para você entender o "porquê", não só a resposta.
            </p>
          </section>

          <section className="sobre-section slideshow-section" aria-labelledby="howto-heading">
            <h2 className="section-heading" id="howto-heading">Como funciona</h2>
            <Slideshow />
          </section>

          <section className="sobre-section" aria-labelledby="tech-heading">
            <h2 className="section-heading" id="tech-heading">Tecnologias</h2>
            <ul className="tech-list" role="list">
              <li className="tech-item">
                <span className="tech-icon">🤖</span>
                <div><strong>Gemini AI</strong><br /><small>Processamento de linguagem e resolução</small></div>
              </li>
              <li className="tech-item">
                <span className="tech-icon">📷</span>
                <div><strong>OCR Nativo</strong><br /><small>Leitura de escrita à mão</small></div>
              </li>
              <li className="tech-item">
                <span className="tech-icon">⚡</span>
                <div><strong>React</strong><br /><small>Componentes, hooks e estado</small></div>
              </li>
            </ul>
          </section>

          <div className="sobre-spacer"></div>
        </div>

        <BottomNav telaAtual={telaAtual} onTrocarTela={onTrocarTela} />
      </div>
    </div>
  );
}