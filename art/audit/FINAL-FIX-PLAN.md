# Plano de correção — pós auditoria final

Somente itens justificados por `FINAL-AUDIT.md`.  
**Não aplicar automaticamente.** Aguardar aprovação explícita.

Ordem: impacto × risco (menor risco primeiro dentro da mesma severidade).

---

## Fase A — Bloqueadores (obrigatório para GO)

### A1. Lab: fetches relativos ao origin
- **Refs:** P0-1, P1-5  
- **Arquivos:** `src/sections/Lab.tsx`, `src/components/navbar/Navbar.tsx`  
- **Mudança:**
  - Substituir `import.meta.env.VITE_API_URL + "/projects.json"` (e `navs.json`) por path relativo: `` `${import.meta.env.BASE_URL}projects.json` `` (idem navs).
  - Em erro de rede: mensagem explícita (“Arquivo indisponível”) em vez de parecer filtro vazio.
- **Validação:** Preview local `dist/` lista o arquivo; filtro por nome/stack funciona; nav continua com FALLBACK se JSON falhar.
- **Risco:** Baixo  
- **Estimativa:** ~30–45 min

### A2. Remover ThemeToggle (tema único Immersive)
- **Refs:** P1-1  
- **Arquivos:** `Navbar.tsx`, `ThemeToggle.tsx` (deixar de importar), opcionalmente simplificar `ThemeProvider` em `App.tsx`  
- **Mudança:** Remover o botão sol/lua. Manter `class="dark"` / tokens Immersive. Não inventar light mode nesta rodada.
- **Validação:** Header sem controle morto; screenshot hero inalterado.
- **Risco:** Baixo  
- **Estimativa:** ~20 min

### A3. Nav ativa = seção correta
- **Refs:** P1-2  
- **Arquivos:** `src/components/navbar/Navbar.tsx`  
- **Mudança:** Recalibrar IntersectionObserver **ou** escolher a seção cujo topo está mais próximo de um offset fixo sob o header; garantir Contato ao chegar no rodapé.
- **Validação:** Clique Trabalho → Lab → Engineering → Contato atualiza `aria-current` e underline; scroll reverso idem.
- **Risco:** Médio  
- **Estimativa:** ~45–90 min

### A4. Copy visitante sem arquivos internos
- **Refs:** P1-3  
- **Arquivos:** `src/content/engineering.ts`, `src/sections/Engineering.tsx`, opcionalmente rótulo em `CaseShell` / `sources` dos cases  
- **Mudança:**
  - Detalhes de métrica: remover “registro original em experiences.json”.
  - Rodapé Engineering: remover linha “Fontes: experiences.json · skills.json…”.
  - Cases: trocar “Fontes: README.md …” por formulação humana (“Baseado no README do repositório”) ou omitir o rodapé se redundante com o link Repo.
- **Validação:** Nenhuma string `*.json` / path de arquivo no DOM visitante (exceto URL pública do PDF).
- **Risco:** Baixo  
- **Estimativa:** ~30 min

**Gate A:** Lab populado em preview + nav Contato correta + sem ThemeToggle + copy limpa → reavaliar GO.

---

## Fase B — Importante (mesmo PR ou PR imediato pós-GO)

### B1. Medium: endurecer fallback
- **Refs:** P1-4  
- **Opções (escolher uma):**
  1. Manter fallback atual + link Medium (mínimo).
  2. Lista estática de 3–5 posts verificados (título, data, URL) se o RSS falhar.
- **Risco:** Baixo  
- **Estimativa:** 15 min (1) / 1–2 h (2)

### B2. SEO mínimo
- **Refs:** P2-1, P2-2  
- **Mudança:** `canonical` + `sitemap.xml` + linha Sitemap em `robots.txt`; meta/OG alinhados ao posicionamento Immersive Engineering.
- **Risco:** Baixo  
- **Estimativa:** ~45 min

---

## Fase C — Refinamento (backlog, não bloqueia GO)

| Ordem | Item | Ref | Notas |
|---|---|---|---|
| C1 | Hit areas ícones sociais | P2-3 | padding / min 44×44 touch |
| C2 | Deduplicar social no Closing | P2-4 | botões **ou** ícones |
| C3 | Remover órfãos confirmados | P2-5 | só após grep zero imports; **não** apagar `ui/` inteiro sem inventário |
| C4 | Remover fontes npm não usadas | P2-5 | dm-sans, fraunces, syne |
| C5 | Comprimir `folgen-group/image.png` | P2-6 | |
| C6 | Smoke Playwright (Lab + nav + demand) | P2-8 | reutilizar `final-audit-capture.mjs` |
| C7 | Renomear package | P2-9 | cosmético |
| C8 | Tuning janela pose Lab | P2-10 | só se arte pedir |

**Fora de escopo deste plano:** novo redesign, novas cenas 3D, pós-processamento, inventar métricas/cases.

---

## Sequência sugerida de execução

```
A1 → A2 → A4 → A3 → (validar Gate A)
      ↓
   B1 / B2 (opcional no mesmo merge)
      ↓
   Deploy + smoke domínio real
      ↓
   C* conforme tempo
```

## Critério de aceite do plano

- Todos os itens **A\*** mergeados e verificados com capturas novas em `art/audit/final/` (ou pasta `final-postfix/`).
- Lab não vazio no preview `dist/`.
- Contato marca Contato na nav.
- Sem ThemeToggle.
- Sem `experiences.json` / paths de fonte no texto da UI.

Aprovação necessária antes de qualquer implementação.
