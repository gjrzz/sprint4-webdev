// ==========================================================
// utils/validation.js
// Portado do script.js original (formatarNome, emailValido)
// ==========================================================

/** Deixa a primeira letra maiúscula e o resto minúsculo. */
export function formatarNome(nome) {
  if (!nome) return '';
  const limpo = nome.trim();
  if (!limpo) return '';
  return limpo.charAt(0).toUpperCase() + limpo.slice(1).toLowerCase();
}

/** Validação simples de e-mail. */
export function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}