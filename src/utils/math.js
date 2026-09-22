// ==========================================================
// utils/math.js
// Resolução real da equação do 2º grau usando o objeto Math.
// Não é texto fixo: os valores de Δ, x1 e x2 são calculados
// de verdade a partir dos coeficientes a, b, c.
// ==========================================================

/**
 * Resolve ax² + bx + c = 0 pela fórmula de Bhaskara.
 * Usa Math.pow, Math.sqrt e Math.round (arredondamento) de fato.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {{a:number,b:number,c:number,delta:number,raizes:number[]|null,tipo:string}}
 */
export function resolverEquacao(a, b, c) {
  const delta = Math.pow(b, 2) - 4 * a * c;

  // Arredonda para 2 casas, evitando erro de ponto flutuante
  const arredondar = (n) => Math.round(n * 100) / 100;

  if (delta < 0) {
    return { a, b, c, delta: arredondar(delta), raizes: null, tipo: 'sem-solucao-real' };
  }

  if (delta === 0) {
    const x = arredondar(-b / (2 * a));
    return { a, b, c, delta: arredondar(delta), raizes: [x], tipo: 'raiz-unica' };
  }

  const raizDelta = Math.sqrt(delta);
  const x1 = arredondar((-b + raizDelta) / (2 * a));
  const x2 = arredondar((-b - raizDelta) / (2 * a));

  // Ordena as raízes (menor primeiro) usando Math.min/Math.max
  const raizes = [Math.min(x1, x2), Math.max(x1, x2)];

  return { a, b, c, delta: arredondar(delta), raizes, tipo: 'duas-raizes' };
}

/**
 * Gera um trio de coeficientes (a, b, c) aleatórios e "bonitos"
 * (raízes inteiras), usando Math.random / Math.floor.
 * Usado internamente para variar a equação de demonstração.
 */
export function gerarCoeficientesAleatorios() {
  const raizAleatoria = () => Math.floor(Math.random() * 9) - 4; // -4..4

  let x1 = raizAleatoria();
  let x2 = raizAleatoria();

  // Garante raízes distintas
  while (x2 === x1) {
    x2 = raizAleatoria();
  }

  // (x - x1)(x - x2) = x² - (x1+x2)x + x1*x2
  const a = 1;
  const b = -(x1 + x2);
  const c = x1 * x2;

  return { a, b, c };
}

/**
 * Monta o texto "x² − 5x + 6 = 0" a partir dos coeficientes.
 */
export function formatarEquacao(a, b, c) {
  const termoB = b >= 0 ? `+ ${b}x` : `− ${Math.abs(b)}x`;
  const termoC = c >= 0 ? `+ ${c}` : `− ${Math.abs(c)}`;
  return `${a}x² ${termoB} ${termoC} = 0`;
}