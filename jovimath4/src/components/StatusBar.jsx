import { useRelogio } from '../hooks/useRelogio';

/** Barra de status (relógio + ícones), igual nas 4 telas. */
export default function StatusBar() {
  const hora = useRelogio();

  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">{hora}</span>
      <div className="status-notch"></div>
      <div className="status-icons">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
          <rect x="0" y="4" width="3" height="7" rx="1" />
          <rect x="4" y="2" width="3" height="9" rx="1" />
          <rect x="8" y="0" width="3" height="11" rx="1" />
          <rect x="12" y="0" width="3" height="11" rx="1" opacity=".3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 24 18" fill="white">
          <path d="M12 4.5C7.3 4.5 3.1 6.7 0 10.1l2.5 2.5c2.4-2.7 5.9-4.4 9.5-4.4s7.1 1.7 9.5 4.4L24 10.1C20.9 6.7 16.7 4.5 12 4.5zm0 6c-3 0-5.7 1.2-7.6 3.2l2.5 2.5C8.2 14.5 10 13.5 12 13.5s3.8 1 5.1 2.7l2.5-2.5C17.7 11.7 15 10.5 12 10.5zm0 6c-1.5 0-2.8.6-3.8 1.5L12 22l3.8-4C14.8 17.1 13.5 16.5 12 16.5z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity=".35" />
          <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="white" />
          <path d="M23 4v4a2 2 0 0 0 0-4z" fill="white" fillOpacity=".4" />
        </svg>
      </div>
    </div>
  );
}