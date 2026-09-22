import { useEffect, useState } from 'react';
import { resolverEquacao } from '../utils/math';

const NEWTON_API_URL = 'https://newton.vercel.app/api/v2/factor';
const TIMEOUT_MS = 5000;

// Casa fatores lineares monicos do tipo "(x - 3)" ou "(x - 2)^2" na resposta
// da Newton API. Quando a equação não tem raiz real, a API devolve a
// expressão apenas simplificada (sem esses fatores), então nenhum match
// aqui já sinaliza "sem-solucao-real".
const REGEX_FATOR = /\(x\s*([+-])\s*(\d+(?:\.\d+)?)\)(?:\^2)?/g;

function arredondar(n) {
  return Math.round(n * 100) / 100;
}

function construirExpressao(a, b, c) {
  const termoB = b >= 0 ? `+${b}x` : `-${Math.abs(b)}x`;
  const termoC = c >= 0 ? `+${c}` : `-${Math.abs(c)}`;
  return `${a}x^2${termoB}${termoC}`;
}

function extrairRaizesDoFator(resultadoFatorado) {
  const raizes = [];
  let match;

  while ((match = REGEX_FATOR.exec(resultadoFatorado)) !== null) {
    const [, sinal, numero] = match;
    raizes.push(sinal === '-' ? Number(numero) : -Number(numero));
  }

  return raizes.sort((x, y) => x - y);
}

/**
 * Resolve ax² + bx + c = 0 consultando a Newton API (endpoint factor) pra
 * fatorar a equação e extrair as raízes reais de verdade. Se a chamada
 * falhar (rede, timeout, resposta inesperada), cai no fallback local
 * resolverEquacao() de utils/math.js. Separa a lógica de fetch/estado
 * (aqui) da renderização (nos componentes).
 */
export function useResolucaoEquacao({ a, b, c }) {
  const [resolucao, setResolucao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function resolver() {
      setCarregando(true);
      setErro(null);

      const delta = arredondar(Math.pow(b, 2) - 4 * a * c);
      const expressao = construirExpressao(a, b, c);
      const controle = new AbortController();
      const timeoutId = setTimeout(() => controle.abort(), TIMEOUT_MS);

      try {
        const resposta = await fetch(`${NEWTON_API_URL}/${encodeURIComponent(expressao)}`, {
          signal: controle.signal,
        });

        if (!resposta.ok) {
          throw new Error(`Newton API respondeu ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (typeof dados.result !== 'string') {
          throw new Error('Resposta inesperada da Newton API');
        }

        const raizesEncontradas = extrairRaizesDoFator(dados.result);
        const raizes = raizesEncontradas.length > 0 ? raizesEncontradas : null;
        const tipo = raizes === null
          ? 'sem-solucao-real'
          : raizes.length === 1
            ? 'raiz-unica'
            : 'duas-raizes';

        if (!cancelado) {
          setResolucao({ a, b, c, delta, raizes, tipo });
        }
      } catch (falha) {
        if (!cancelado) {
          setResolucao(resolverEquacao(a, b, c));
          setErro(falha.message);
        }
      } finally {
        clearTimeout(timeoutId);
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    resolver();

    return () => {
      cancelado = true;
    };
  }, [a, b, c]);

  return { resolucao, carregando, erro };
}
