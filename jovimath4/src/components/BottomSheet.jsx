import { useEffect, useRef } from 'react';
import { formatarEquacao } from '../utils/math';

/**
 * Bottom Sheet com a resolução passo a passo.
 * Antes o conteúdo era HTML fixo; agora os números vêm
 * de verdade do resultado calculado em utils/math.js.
 */
export default function BottomSheet({ aberto, resolucao, onFechar }) {
  const botaoFecharRef = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    const id = setTimeout(() => botaoFecharRef.current?.focus(), 400);
    return () => clearTimeout(id);
  }, [aberto]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && aberto) onFechar();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [aberto, onFechar]);

  if (!resolucao) return null;

  const { a, b, c, delta, raizes } = resolucao;
  const equacaoTexto = formatarEquacao(a, b, c);

  function copiarSolucao() {
    const texto = montarTextoSolucao(resolucao);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(texto)
        .then(() => alert('✅ Solução copiada!'))
        .catch(() => alert('Erro ao copiar.'));
    } else {
      alert(texto);
    }
  }

  return (
    <div
      className={`bottom-sheet ${aberto ? 'show' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Resolução da equação"
      aria-hidden={!aberto}
    >
      <div className="bottom-sheet-inner">
        <div className="sheet-handle" aria-hidden="true"></div>

        <div className="sheet-header">
          <div className="sheet-title-block">
            <div className="ai-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Gemini
            </div>
            <h3 className="sheet-title">Resolução Passo a Passo</h3>
            <p className="sheet-equation">{equacaoTexto}</p>
          </div>
          <button
            ref={botaoFecharRef}
            className="icon-btn sheet-close"
            aria-label="Fechar resolução"
            onClick={onFechar}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="sheet-content">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-body">
              <h4 className="step-title">Identificar os coeficientes</h4>
              <p className="step-text">
                Na forma ax² + bx + c = 0, identificamos: <strong>a = {a}</strong>, <strong>b = {b}</strong>, <strong>c = {c}</strong>
              </p>
            </div>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-body">
              <h4 className="step-title">Calcular o Discriminante (Δ)</h4>
              <p className="step-text">
                Δ = b² − 4ac<br />
                Δ = ({b})² − 4·({a})·({c})<br />
                Δ = <strong>{delta}</strong>
              </p>
            </div>
          </div>

          {raizes ? (
            <>
              <div className="step-card">
                <span className="step-number">03</span>
                <div className="step-body">
                  <h4 className="step-title">Aplicar a Fórmula de Bhaskara</h4>
                  <p className="step-text">
                    x = (−b ± √Δ) / 2a<br />
                    x = ({-b} ± √{delta}) / {2 * a}
                  </p>
                </div>
              </div>

              <div className="step-card">
                <span className="step-number">04</span>
                <div className="step-body">
                  <h4 className="step-title">Encontrar {raizes.length > 1 ? 'as Raízes' : 'a Raiz'}</h4>
                  <p className="step-text">
                    {raizes.length > 1
                      ? <>x₁ = <strong>{raizes[0]}</strong><br />x₂ = <strong>{raizes[1]}</strong></>
                      : <>x = <strong>{raizes[0]}</strong> (raiz dupla)</>}
                  </p>
                </div>
              </div>

              <div className="step-card step-card--result">
                <span className="step-number">✓</span>
                <div className="step-body">
                  <h4 className="step-title">Resultado Final</h4>
                  <p className="step-text result-text">
                    S = {'{'}{raizes.join(', ')}{'}'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="step-card step-card--result">
              <span className="step-number">✓</span>
              <div className="step-body">
                <h4 className="step-title">Resultado Final</h4>
                <p className="step-text result-text">Δ &lt; 0 → não há raízes reais. S = ∅</p>
              </div>
            </div>
          )}

          <div className="sheet-actions">
            <button className="btn-primary btn-copy" onClick={copiarSolucao}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar Solução
            </button>
            <button className="btn-secondary btn-new" onClick={onFechar}>
              Nova Equação
            </button>
          </div>
        </div>
      </div>

      <div className="sheet-overlay" onClick={onFechar}></div>
    </div>
  );
}

function montarTextoSolucao({ a, b, c, delta, raizes }) {
  const equacao = formatarEquacao(a, b, c);
  const linhaResultado = raizes
    ? `S = {${raizes.join(', ')}}`
    : 'S = ∅ (sem raízes reais)';

  return `
JOVI Math — Resolução de ${equacao}

Passo 1:
a = ${a}
b = ${b}
c = ${c}

Passo 2:
Δ = b² - 4ac
Δ = ${delta}

Resultado:
${linhaResultado}
`;
}
