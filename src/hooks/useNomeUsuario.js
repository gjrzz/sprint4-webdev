import { useState } from 'react';

const CHAVE = 'jovi_user_name';

/**
 * Hook que lê/grava o nome do usuário no localStorage.
 * Substitui os localStorage.getItem/setItem espalhados
 * no script.js original por um único ponto de verdade.
 */
export function useNomeUsuario() {
  const [nome, setNomeState] = useState(() => localStorage.getItem(CHAVE) || '');

  function setNome(novoNome) {
    localStorage.setItem(CHAVE, novoNome);
    setNomeState(novoNome);
  }

  return [nome, setNome];
}