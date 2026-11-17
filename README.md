# Portfólio — Gustavo Macedo

Portfólio estático de projetos em IA generativa, agentes e machine learning. O site não possui dependências de execução ou etapa de build.

## Executar localmente

```powershell
python -m http.server 8000
```

Abra `http://localhost:8000`.

## Publicar no GitHub Pages

1. Envie o repositório ao GitHub.
2. Em **Settings → Pages**, selecione **GitHub Actions** em *Source*.
3. Faça push para `main`; o workflow publica o site automaticamente.

Os conteúdos editoriais de origem permanecem em `Material_para_portfolio/`. Os arquivos públicos usados pelo site estão em `assets/` com nomes seguros para URL.
