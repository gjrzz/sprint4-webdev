/** Card de um integrante. Componente filho de EquipeScreen. */
export default function MemberCard({ nome, rm, cor }) {
  const iniciais = nome
    .split(' ')
    .map((parte) => parte.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="member-card glass-card" aria-label={nome}>
      <div className="member-avatar" style={{ '--avatar-color': cor }}>
        <span className="avatar-initials">{iniciais}</span>
      </div>
      <div className="member-info">
        <h3 className="member-name">{nome}</h3>
        <p className="member-rm">RM <strong>{rm}</strong></p>
      </div>
      <div className="member-links">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="member-link"
          aria-label={`GitHub de ${nome.split(' ')[0]}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.72-4.04-1.61-4.04-1.61-.54-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.69.82.58C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
    </article>
  );
}