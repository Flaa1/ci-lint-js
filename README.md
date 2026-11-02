# CI/CD na prática com JavaScript

Lint (ESLint) e testes (Jest) automáticos com GitHub Actions.

## Estrutura

```
my-project/
├── .github/workflows/
│   ├── lint.yml          # lint + testes a cada push/PR
│   └── tests-only.yml    # 2º workflow: só roda quando tests/ muda (ou manual)
├── src/script.js
├── tests/script.test.js
├── .gitignore
├── eslint.config.js
└── package.json
```

## Rodar local

```bash
npm install
npx eslint src/script.js
npx jest tests/script.test.js
```

## Subir para o GitHub

```bash
git init
git add .
git commit -m "Projeto CI com ESLint e Jest"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

Na aba **Actions**, o `Lint and Test Specific Script` roda e passa ✅.
O `tests-only.yml` também roda neste primeiro push (pasta tests/ é nova).

## Exercício 2 — quebrar de propósito

**Lint:** em `src/script.js`, adicione `const unused = 1` e tire um `;`.
Faça commit + push → ❌ no step "Run lint check" (os testes nem rodam).

Saída obtida localmente:
```
1:7   error  'unused' is assigned a value but never used   no-unused-vars
1:17  error  Missing semicolon                             semi
3:1   error  Expected indentation of 2 spaces but found 4  indent
```

**Teste:** desfaça o erro de lint e troque `toBe(5)` por `toBe(6)` em
`tests/script.test.js`. Push → ❌ no step "Run tests" (`Expected: 6, Received: 5`).

Depois corrija tudo (`npx eslint --fix src/script.js` + apagar a variável) e faça push → ✅.

## Exercício 3 — segundo workflow com paths diferentes

| Alteração no push | lint.yml | tests-only.yml |
|---|---|---|
| Só `src/script.js` | Roda | Não roda |
| Só `tests/script.test.js` | Roda | Roda |
| Só `README.md` | Roda | Não roda |
| Botão "Run workflow" | — | Roda (workflow_dispatch) |

Conclusão: o GitHub lê todos os `.yml` e roda cada um cujo `on:` combina com o evento.
O filtro `paths` limita o workflow aos arquivos listados.
