# 📐 JOVI Math — Sprint 3: Web Development (React)

> Migração do protótipo (HTML/CSS/JS) da Sprint 2 para **React**, com estrutura de
> componentes pai → filho, hooks, `localStorage` e operações com `Math`.

---

## 👥 Equipe — Grupo F.D.P.

| Nome | RM |
|---|---|
| Andrey Luigi | RM569575 |
| Henrique da Silva | RM569137 |
| Gabriel Juarez | RM563680 |
| Nicolas Marçal | RM565982 |

**Instituição:** FIAP — Faculdade de Informática e Administração Paulista
**Disciplina:** Web Development
**Sprint:** Sprint 3 — React

---

## 🎯 Sobre o Projeto

O **JOVI Math** simula uma funcionalidade nativa de câmera de smartphone que lê
equações matemáticas (via OCR simulado) e retorna, em um *Bottom Sheet*, a
resolução passo a passo. Nesta sprint o protótipo estático virou uma
aplicação **React** (SPA, sem recarregar página), mantendo o mesmo visual e fluxo
da Sprint 2.

---

## 🛠️ Tecnologias utilizadas

- **React 19** (componentes funcionais + Hooks: `useState`, `useEffect`, `useRef`)
- **Vite** — build tool e servidor de desenvolvimento
- **JavaScript ES6+** — Template Literals, Destructuring, Arrow Functions
- **CSS3** — Flexbox, Custom Properties, `backdrop-filter`, `@keyframes` (portado da Sprint 2)
- **localStorage** — persistência do nome do usuário entre sessões
- **Math** — `Math.pow`, `Math.sqrt`, `Math.min/max`, `Math.round`, `Math.random`, `Math.floor`
  (ver `src/utils/math.js`: a resolução da equação do 2º grau é calculada de verdade,
  não é texto fixo)

---

## 📁 Estrutura de componentes (pai → filho)

src/
├── App.jsx → Componente raiz: controla qual "tela" está ativa
├── components/
│ ├── LoginScreen.jsx → Tela de login (formulário + validação)
│ ├── CameraScreen.jsx → Tela principal (câmera, modos, saudação)
│ │ └── BottomSheet.jsx → Painel de resolução (filho de CameraScreen)
│ ├── SobreScreen.jsx → Tela "Sobre"
│ │ └── Slideshow.jsx → Carrossel de 5 passos (filho de SobreScreen)
│ ├── EquipeScreen.jsx → Tela "Equipe" (componente pai)
│ │ └── MemberCard.jsx → Card de cada integrante (filho, via .map())
│ ├── StatusBar.jsx → Barra de status (relógio), usada nas 4 telas
│ └── BottomNav.jsx → Navegação inferior (troca de tela por estado)
├── hooks/
│ ├── useRelogio.js → Hook do relógio (status bar)
│ └── useNomeUsuario.js → Hook de leitura/escrita no localStorage
├── utils/
│ ├── math.js → Resolução da equação (Math) + gerador de coeficientes
│ └── validation.js → Validação de e-mail e formatação de nome
└── styles/style.css → CSS portado da Sprint 2 (Dark Mode + Glassmorphism)


Não usamos React Router: a navegação entre as 4 telas é feita por um único
estado (`tela`) no componente raiz `App.jsx`, repassado para `BottomNav` — mantendo
o projeto simples e 100% SPA.

---

## 🤖 Onde e como a IA foi utilizada

A IA (Claude, da Anthropic) foi utilizada para **assistir no desenvolvimento**:
ajudou a planejar a divisão de componentes React a partir do protótipo HTML
já existente da Sprint 2, gerou o código inicial dos componentes seguindo essa
estrutura, portou a lógica que antes estava em `script.js` (Vanilla JS) para
hooks e funções puras, e implementou o cálculo real da equação do 2º grau com
`Math` em `src/utils/math.js`. Todo o código gerado foi revisado pela equipe
antes da entrega.

**Importante:** a IA "Gemini" mostrada na interface do app (badge no Bottom
Sheet) é parte da **narrativa do produto simulado** — o app finge ser um
recurso de câmera com IA embutida — e não é uma integração real com uma API
de IA nesta sprint.

---

## 🚀 Como instalar e rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18 ou superior instalado

### 1. Instalar as dependências

```bash
npm install
```

### 2. Rodar em ambiente de desenvolvimento

```bash
npm run dev
```

Acesse o endereço mostrado no terminal (geralmente `http://localhost:5173`).

### 3. Gerar build de produção (opcional)

```bash
npm run build
npm run preview
```

---

## 🔑 Usuários e senha para teste

Não há autenticação real (não há backend). O formulário de login é apenas
validado no front-end:

E-mail: gabrieljuarez@fiap.com.br
Senha: 123456
Nome: Gabriel (opcional — personaliza a saudação)


Qualquer e-mail válido (formato `algo@algo.com`) e senha com 4+ caracteres
entram no app.

---

## 🔄 Fluxo de uso

1. **Login** — preenche e-mail/senha; React valida e salva o nome no `localStorage`
2. **Câmera** — clique no modo **MATH** na barra inferior; o scanner e a equação aparecem
3. **Resolver** — clique no botão azul de captura para abrir o Bottom Sheet com a resolução
4. **Copiar** — clique em "Copiar Solução" (confirmação via `alert()`)
5. **Configurações** — clique no ⚙️ para um `prompt()` que atualiza o nome salvo
6. **Sobre** — acesse pela nav inferior para o carrossel interativo de 5 passos
7. **Equipe** — lista os integrantes do grupo (RM de cada um)

---

## 🌐 Deploy

**Link do Deploy (Vercel):** https://sprint3-webdev-lwgn-gold.vercel.app
**Link do Repositório GitHub:** https://github.com/gjrzz/sprint3-webdev

---

## 📄 Licença

Projeto acadêmico — FIAP 2026. Todos os direitos reservados ao Grupo F.D.P.
