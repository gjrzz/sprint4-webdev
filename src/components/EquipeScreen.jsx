import StatusBar from './StatusBar';
import BottomNav from './BottomNav';
import MemberCard from './MemberCard';

const INTEGRANTES = [
  { nome: 'Andrey Luigi', rm: '569575', cor: '#007AFF' },
  { nome: 'Henrique da Silva', rm: '569137', cor: '#30D158' },
  { nome: 'Gabriel Juarez', rm: '563680', cor: '#FF9F0A' },
  { nome: 'Nicolas Marçal', rm: '565982', cor: '#FF453A' },
];

/** Tela "Equipe" (componente pai). Portada de equipe.html. */
export default function EquipeScreen() {
  return (
    <div className="equipe-page">
      <div className="phone-frame" role="main">
        <StatusBar />

        <div className="page-scroll-content">
          <section className="equipe-hero pt-8 px-6 pb-5">
            <h1 className="equipe-title">Grupo <span className="brand-accent">F.D.P.</span></h1>
            <p className="equipe-subtitle">FIAP · Disciplina Web Development · Sprint 3</p>
            <div className="fiap-badge">
              <span>🎓</span> FIAP – Faculdade de Informática e Administração Paulista
            </div>
          </section>

          <section className="grid grid-cols-1 gap-2.5 px-6 py-2" aria-label="Membros da equipe">
            {INTEGRANTES.map((pessoa) => (
              <MemberCard key={pessoa.rm} nome={pessoa.nome} rm={pessoa.rm} cor={pessoa.cor} />
            ))}
          </section>

          <section className="project-info glass-card" aria-label="Informações do projeto">
            <div className="project-info-row">
              <span className="info-label">Disciplina</span>
              <span className="info-value">Web Development</span>
            </div>
            <div className="project-info-row">
              <span className="info-label">Sprint</span>
              <span className="info-value">Sprint 3 — React</span>
            </div>
            <div className="project-info-row">
              <span className="info-label">Stack</span>
              <span className="info-value">React · Vite · JS</span>
            </div>
          </section>

          <div className="sobre-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}