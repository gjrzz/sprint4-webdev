# 📐 JOVI Math — Sprint 4: Web Development + FrontEnd Design (React)

> Evolução do app React da Sprint 3: rotas reais com `react-router-dom`,
> integração com a Newton API (resolução de equações de verdade, com fallback
> local), e interface adaptada com Tailwind CSS (layout/responsividade),
> mantendo o CSS original para os efeitos visuais mais complexos
> (glassmorphism, `@keyframes`).

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
**Sprint:** Sprint 4 — React + Tailwind + Rotas + Newton API

---

## 🎯 Sobre o Projeto

O **JOVI Math** simula uma funcionalidade nativa de câmera de smartphone que lê
equações matemáticas (via OCR simulado) e retorna, em um *Bottom Sheet*, a
resolução passo a passo. A aplicação React da Sprint 3 (SPA por estado) evoluiu
nesta sprint para navegação real por URL, resolução de equação consultando uma
API de verdade (com fallback local) e uma interface adaptada com Tailwind CSS
— mantendo o mesmo visual (dark mode + glassmorphism) e o mesmo fluxo de uso.

---

## 🛠️ Tecnologias utilizadas

- **React 19** (componentes funcionais + Hooks: `useState`, `useEffect`, `useRef`)
- **Vite** — build tool e servidor de desenvolvimento
- **react-router-dom** — rotas públicas/privadas reais por URL (ver seção de rotas abaixo)
- **Tailwind CSS v4** (`@tailwindcss/vite`) — layout, espaçamento, grid/flex e
  responsividade (`sm:`/`md:`/`lg:`). Abordagem híbrida: `@keyframes`,
  glassmorphism (`backdrop-filter`) e efeitos visuais complexos continuam em
  `src/styles/style.css`
- **Newton API** (`newton.vercel.app/api/v2`) — resolução real da equação do
  2º grau (ver seção de integração abaixo)
- **JavaScript ES6+** — Template Literals, Destructuring, Arrow Functions
- **CSS3** — Flexbox, Custom Properties, `backdrop-filter`, `@keyframes` (portado da Sprint 2)
- **localStorage** — persistência do nome do usuário entre sessões
- **Math** — `Math.pow`, `Math.sqrt`, `Math.min/max`, `Math.round`, `Math.random`, `Math.floor`
  (ver `src/utils/math.js`: fallback local usado quando a Newton API falha —
  continua calculando a resolução de verdade, não é texto fixo)

---

## 📁 Estrutura de componentes (pai → filho)

src/
├── App.jsx → Componente raiz: define as rotas (react-router-dom)
├── components/
│ ├── LoginScreen.jsx → Tela de login (formulário + validação, rota pública)
│ ├── RotaPrivada.jsx → Redireciona pra /login se não houver usuário salvo
│ ├── CameraScreen.jsx → Tela principal (câmera, modos, saudação)
│ │ └── BottomSheet.jsx → Painel de resolução (filho de CameraScreen)
│ ├── SobreScreen.jsx → Tela "Sobre"
│ │ └── Slideshow.jsx → Carrossel de 5 passos (filho de SobreScreen)
│ ├── EquipeScreen.jsx → Tela "Equipe" (componente pai)
│ │ └── MemberCard.jsx → Card de cada integrante (filho, via .map())
│ ├── StatusBar.jsx → Barra de status (relógio), usada nas 4 telas
│ └── BottomNav.jsx → Navegação inferior (usa useNavigate/useLocation)
├── hooks/
│ ├── useRelogio.js → Hook do relógio (status bar)
│ ├── useNomeUsuario.js → Hook de leitura/escrita no localStorage
│ └── useResolucaoEquacao.js → Hook que consulta a Newton API (com fallback local)
├── utils/
│ ├── math.js → Resolução da equação (Math) + gerador de coeficientes
│ │ (usado como fallback pelo useResolucaoEquacao quando a API falha)
│ └── validation.js → Validação de e-mail e formatação de nome
└── styles/style.css → CSS portado da Sprint 2 (Dark Mode + Glassmorphism)


## 🧭 Rotas (react-router-dom)

| Rota | Componente | Acesso |
|---|---|---|
| `/login` | `LoginScreen` | Pública |
| `/camera` | `CameraScreen` | Privada (via `RotaPrivada`) |
| `/sobre` | `SobreScreen` | Privada (via `RotaPrivada`) |
| `/equipe` | `EquipeScreen` | Privada (via `RotaPrivada`) |
| `*` | — | Redireciona pra `/camera` (logado) ou `/login` (não logado) |

`RotaPrivada` verifica se existe um nome de usuário salvo no `localStorage`
(via `useNomeUsuario`); se não existir, redireciona pra `/login`. Ao logar,
`LoginScreen` navega pra `/camera` com `useNavigate`. A `BottomNav` também usa
`useNavigate`/`useLocation` — a navegação entre as 4 telas agora troca a URL
de verdade, em vez de um estado local em `App.jsx` como na Sprint 3.

---

## 🔗 Integração com a Newton API

O hook `src/hooks/useResolucaoEquacao.js` resolve a equação do 2º grau
consultando de verdade o endpoint `factor` da
[Newton API](https://newton.vercel.app/api/v2/) (pública, sem API key):
monta a expressão a partir dos coeficientes (ex: `1x^2-5x+6`), extrai as
raízes da resposta fatorada (ex: `(x - 3) (x - 2)`) e mantém o cálculo do
discriminante (Δ) local, já que é matemática pura. Se a chamada falhar (sem
internet, timeout de 5s, resposta inesperada), o hook cai automaticamente no
fallback local `resolverEquacao()` de `src/utils/math.js` — a resolução
continua funcionando offline. Enquanto a API responde, `BottomSheet.jsx`
mostra um estado de carregamento (spinner com Tailwind).

A lógica de fetch/estado fica isolada no hook; os componentes (`CameraScreen`,
`BottomSheet`) só consomem `{ resolucao, carregando, erro }` — separação entre
lógica e renderização.

> Testamos primeiro o endpoint `zeroes` (candidato mais óbvio pro caso de
> uso), mas ele devolve respostas incorretas pra raiz dupla e pra equações
> sem raiz real — por isso a escolha final foi o endpoint `factor`.

## 🤖 Onde e como a IA foi utilizada

A IA (Claude Code, da Anthropic) foi utilizada para planejar a divisão de
componentes React a partir do protótipo HTML da Sprint 2 e nesta sprint
implementou a integração com a Newton API. Todo o código gerado foi revisado pela equipe
antes da entrega.

**Importante — duas coisas que não são "IA" aqui, apesar do nome:**
- O badge **"Gemini"** mostrado na interface do app (Bottom Sheet) é parte da
  **narrativa do produto simulado** — o app finge ser um recurso de câmera
  com IA embutida — e não é uma integração real com uma API de IA. A integração
  real custaria dinheiro. é possivel, só não faz sentido no momento.
- A **Newton API**, usada de verdade para resolver a equação (seção acima),
  também **não é uma IA** — é uma API de resolução simbólica de matemática
  (álgebra/cálculo), sem nenhum modelo de linguagem envolvido.

A única IA real usada no projeto é o **Claude Code**, como assistente de
desenvolvimento da equipe.

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

1. **Login** (`/login`) — preenche e-mail/senha; React valida, salva o nome no
   `localStorage` e navega pra `/camera`
2. **Câmera** (`/camera`) — clique no modo **MATH** na barra inferior; o scanner
   e a equação aparecem
3. **Resolver** — clique no botão azul de captura para abrir o Bottom Sheet;
   enquanto a Newton API responde aparece um estado de carregamento, depois a
   resolução passo a passo
4. **Copiar** — clique em "Copiar Solução" (confirmação via `alert()`)
5. **Configurações** — clique no ⚙️ para um `prompt()` que atualiza o nome salvo
6. **Sobre** (`/sobre`) — acesse pela nav inferior para o carrossel interativo de 5 passos
7. **Equipe** (`/equipe`) — lista os integrantes do grupo (RM de cada um)

Acessar `/camera`, `/sobre` ou `/equipe` diretamente pela URL sem estar
logado redireciona automaticamente pra `/login` (ver seção de Rotas acima).

---

## 🌐 Deploy

**Link do Deploy (Vercel):** https://sprint3-webdev-lwgn-gold.vercel.app _(atualizar se for gerado um novo deploy pra Sprint 4)_
**Link do Repositório GitHub:** https://github.com/gjrzz/sprint4-webdev

---

## 📄 Licença

Projeto acadêmico — FIAP 2026. Todos os direitos reservados ao Grupo F.D.P.
