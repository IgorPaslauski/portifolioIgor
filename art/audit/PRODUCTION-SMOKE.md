# Production smoke — Immersive Engineering

| Campo | Valor |
|---|---|
| **Domínio** | https://paslauski.com.br |
| **Commit publicado** | `fd0749e6a6c06f53d3c9974fd49521feae2729fd` |
| **Mensagem** | Publish Immersive Engineering portfolio with Fase A production fixes. |
| **Deploy** | GitHub Actions → Pages (`Deploy static content to Pages` run `39967715370`) — **success** |
| **Data da validação** | 2026-10-23 (~11:17 −03) |
| **Capturas** | `art/audit/production/` + `report.json` |

## Veredito final

**NO-GO para visitantes finais** — bloqueio de infraestrutura TLS.

A aplicação Immersive Engineering **está publicada e funcional** no host Pages (conteúdo do commit acima). Porém o certificado HTTPS do domínio customizado **ainda não existe** (`gh api …/pages` → *"The certificate does not exist yet"*). O servidor responde com certificado `CN=*.github.io`, o que provoca `ERR_CERT_COMMON_NAME_INVALID` / `SEC_E_WRONG_PRINCIPAL` em browsers e clientes TLS estritos.

| Camada | Status |
|---|---|
| Código / redesign / Fase A | **GO** (smoke de produto passou) |
| Deploy Pages | **GO** |
| TLS `paslauski.com.br` | **NO-GO** até GitHub emitir o cert do domínio |

**Quando o certificado for provisionado** (DNS já aponta para `185.199.1xx.153`), revalidar HTTPS sem `ignoreHTTPSErrors` e promover para **GO público**.

---

## Pré-deploy (resumo)

- Branch `main`; alterações da Fase A commitadas e pushadas.
- Typecheck OK · build OK.
- Assets no `dist`: `sculpture/monogram.glb`, `cv-igor-paslauski.pdf`, `projects.json`, `navs.json`, fontes, `CNAME`.
- Hospedagem: GitHub Pages (workflow em push para `main`) + CNAME `paslauski.com.br`.
- Sem segredos no bundle (apenas URLs públicas / `VITE_API_URL` legado não usado pelo Lab).

---

## Resultado por verificação

| Verificação | Resultado | Notas |
|---|---|---|
| Carregamento do hero | **PASS** | Immersive Engineering + Lock |
| Signature Lock desktop | **PASS** | `canvas: true` |
| Fallback reduced motion | **PASS** | `canvas: false`, `svg: true` |
| Scroll Hero→…→Closing | **PASS** | `t` 0.002 → 0.07 → 0.63 → 0.82 → 1 |
| Scroll reverso | **PASS** | nav alinhada |
| Nav ativa | **PASS** | Trabalho / Lab / Engineering / Contato |
| Lab 14 projetos + filtro | **PASS** | filtro `PortGo` → 1 |
| Medium erro | **PASS** | fallback + “Ver no Medium” (CORS proxy) |
| Contato / LinkedIn / GitHub | **PASS** | mailto + links |
| CV PDF | **PASS** | HEAD 200 (no contexto da página) |
| Mobile | **PASS** | Lab 14; capturas hero/lab/contact |
| Demand-mode idle | **PASS** | `staticDraws: 0` |
| Âncoras `#work` `#lab` `#contact` | **PASS** | hash + nav + `t` |
| Console crítico (app) | **PASS** | só ruído rss2json |
| Estáticos 200 (curl `-sk`) | **PASS** | GLB, CV, CNAME, JS build `index-RrzxzrgH.js` |
| SEO meta presentes | **PASS** | title/description/OG/theme-color |
| **HTTPS confiado pelo browser** | **FAIL** | cert `*.github.io` ≠ `paslauski.com.br` |

Smoke browser executado com `ignoreHTTPSErrors: true` apenas para validar o produto atrás do TLS quebrado.

---

## Erros encontrados

1. **P0 infra — certificado custom domain ausente**  
   - Evidência: API Pages 404 “certificate does not exist yet”; peer cert `CN=*.github.io`.  
   - Impacto: visitantes veem aviso de segurança / conexão bloqueada.  
   - Ação: aguardar provisionamento Let’s Encrypt do GitHub Pages (DNS já correto). Opcional: em Settings → Pages, remover/reaplicar o domínio customizado se o cert não aparecer em algumas horas.  
   - **Não é regressão do redesign.**

2. **P2 — Medium via rss2json**  
   - CORS/Cloudflare; fallback OK; não bloqueia.

---

## Pendências não bloqueantes (produto)

- Canonical / sitemap / meta Immersive (P2 do audit final).
- Cleanup de órfãos / deps `next-themes`.
- Dependabot (53 avisos no remote — fora do escopo deste deploy).

---

## Capturas

- `production/desktop-hero.png`
- `production/desktop-work.png` … `desktop-contact.png`
- `production/desktop-lab.png`
- `production/desktop-anchor-*.png`
- `production/desktop-reduced-motion.png`
- `production/mobile-hero.png` / `mobile-lab.png` / `mobile-contact.png`

---

## Encerramento

- Versão de **aplicação** aprovada: commit `fd0749e` (Immersive Engineering + Fase A).
- **Não** iniciar novo redesign.
- Publicação estável para o público: **após TLS do domínio**.
- Melhorias futuras (P2) fora do escopo de publicação.
