import { useEffect, useState } from 'react';

/**
 * Hook do relógio da status bar.
 * Portado de iniciarRelogio() do script.js original.
 */
export function useRelogio() {
  const [hora, setHora] = useState(() => formatarHoraAtual());

  useEffect(() => {
    const id = setInterval(() => setHora(formatarHoraAtual()), 60000);
    return () => clearInterval(id);
  }, []);

  return hora;
}

function formatarHoraAtual() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  return `${horas}:${minutos}`;
}