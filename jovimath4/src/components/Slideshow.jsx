import { useEffect, useRef, useState } from 'react';

const SLIDES = [
  {
    badge: '01',
    titulo: 'Abra a câmera',
    desc: 'Abra a câmera nativa do seu celular. Não é necessário baixar nenhum aplicativo extra.',
    visual: (
      <div className="slide-visual slide-visual--camera">
        <div className="slide-phone-mock">
          <div className="mock-screen dark">
            <div className="mock-mode-bar">
              <span>VÍDEO</span>
              <span className="mock-active">FOTO</span>
              <span>MATH</span>
            </div>
            <div className="mock-capture-btn"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    badge: '02',
    titulo: 'Selecione o modo MATH',
    desc: <>Deslize o menu inferior da câmera de "FOTO" para o modo <strong>MATH</strong>. O botão de captura ficará azul.</>,
    visual: (
      <div className="slide-visual slide-visual--swipe">
        <div className="slide-phone-mock">
          <div className="mock-screen dark">
            <div className="mock-mode-bar">
              <span>FOTO</span>
              <span className="mock-active mock-math">MATH ✦</span>
              <span>RETRATO</span>
            </div>
            <div className="mock-capture-btn mock-capture-btn--blue"></div>
          </div>
        </div>
        <div className="slide-swipe-hint" aria-hidden="true">← deslize →</div>
      </div>
    ),
  },
  {
    badge: '03',
    titulo: 'Aponte para a equação',
    desc: 'Enquadre a equação do caderno no scanner. A IA reconhece a escrita à mão automaticamente.',
    visual: (
      <div className="slide-visual slide-visual--scan">
        <div className="slide-phone-mock">
          <div className="mock-screen dark">
            <div className="mock-scanner-frame">
              <div className="mock-corner tl"></div>
              <div className="mock-corner tr"></div>
              <div className="mock-corner bl"></div>
              <div className="mock-corner br"></div>
              <div className="mock-scan-label">x² − 5x + 6 = 0</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    badge: '04',
    titulo: 'Clique em Resolver',
    desc: 'Pressione o botão azul. O Gemini irá processar a equação e preparar a resolução completa.',
    visual: (
      <div className="slide-visual slide-visual--capture">
        <div className="slide-phone-mock">
          <div className="mock-screen dark">
            <div className="mock-eq-badge">x² − 5x + 6 = 0</div>
            <div className="mock-capture-btn mock-capture-btn--blue mock-pulse"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    badge: '05',
    titulo: 'Veja o passo a passo',
    desc: 'Um painel sobe da parte inferior com a resolução completa, da fórmula ao resultado final.',
    visual: (
      <div className="slide-visual slide-visual--result">
        <div className="slide-phone-mock">
          <div className="mock-screen dark">
            <div className="mock-bottom-sheet">
              <div className="mock-sheet-line mock-sheet-line--wide"></div>
              <div className="mock-sheet-line"></div>
              <div className="mock-sheet-line mock-sheet-line--med"></div>
              <div className="mock-sheet-btn">S = {'{2, 3}'}</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

/** Carrossel "Como funciona". Portado de iniciarSlideshow(). */
export default function Slideshow() {
  const [indice, setIndice] = useState(0);
  const trackRef = useRef(null);
  const inicioTouchRef = useRef(0);

  function mudarSlide(novoIndice) {
    const limitado = Math.max(0, Math.min(novoIndice, SLIDES.length - 1));
    setIndice(limitado);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') mudarSlide(indice - 1);
      if (event.key === 'ArrowRight') mudarSlide(indice + 1);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [indice]);

  function handleTouchStart(event) {
    inicioTouchRef.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    const fimTouch = event.changedTouches[0].clientX;
    const distancia = inicioTouchRef.current - fimTouch;

    if (Math.abs(distancia) > 40) {
      mudarSlide(distancia > 0 ? indice + 1 : indice - 1);
    }
  }

  return (
    <div className="slideshow-container" role="region" aria-label="Como usar o JOVI Math">
      <div
        className="slideshow-track"
        id="slideshow-track"
        ref={trackRef}
        aria-live="polite"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.badge}
            className="slide"
            role="group"
            aria-label={`Passo ${i + 1} de ${SLIDES.length}`}
            style={{ transform: `translateX(${(i - indice) * 100}%)` }}
          >
            {slide.visual}
            <div className="slide-content">
              <span className="slide-step-badge">{slide.badge}</span>
              <h3 className="slide-title">{slide.titulo}</h3>
              <p className="slide-desc">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="slideshow-controls">
        <button
          className="slide-btn"
          aria-label="Passo anterior"
          disabled={indice === 0}
          onClick={() => mudarSlide(indice - 1)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="slideshow-dots" role="tablist" aria-label="Slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.badge}
              className={`dot ${i === indice ? 'active' : ''}`}
              role="tab"
              aria-selected={i === indice}
              aria-label={`Passo ${i + 1}`}
              onClick={() => mudarSlide(i)}
            />
          ))}
        </div>

        <button
          className="slide-btn"
          aria-label="Próximo passo"
          disabled={indice === SLIDES.length - 1}
          onClick={() => mudarSlide(indice + 1)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <p className="slideshow-counter" aria-live="polite">Passo {indice + 1} de {SLIDES.length}</p>
    </div>
  );
}