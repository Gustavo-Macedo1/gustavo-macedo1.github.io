## Demo HBr - MCP Server

![status](https://img.shields.io/badge/status-active-brightgreen)
![python](https://img.shields.io/badge/python-3.8%2B-blue)
![ollama](https://img.shields.io/badge/ollama-required-yellow)
![mysql](https://img.shields.io/badge/mysql-required-orange)
![license](https://img.shields.io/badge/license-TODO-lightgrey)

Descrição
---------

Este repositório contém um servidor MCP (Model-Context-Protocol) simples feito com FastMCP para expor ferramentas (tools) que interagem com uma base MySQL. O projeto também inclui um app Streamlit (`app.py`) que consome essas tools via Llama Index (usando `BasicMCPClient`) e pode criar um agente que chama as ferramentas registradas no servidor.

Principais componentes
- `servidor.py` — servidor MCP que registra ferramentas (tools) para manipular a tabela `tomografo`.
- `app.py` — app Streamlit que cria um agente FunctionAgent via Llama Index e consome as tools do MCP. Usa `OpenAI` (ou outro LLM configurado) para rodar o agente e `BasicMCPClient` para acessar o servidor MCP.
- `cliente_ollama.ipynb` — notebook com um exemplo alternativo de cliente.

Funcionalidades (atualizadas)
- Ferramentas MCP disponíveis em `servidor.py`:
  - `add_data(query: str) -> bool` — executa INSERTs na tabela `tomografo`.
  - `read_data(query: str = "SELECT * FROM tomografo") -> str` — executa SELECTs e retorna JSON com os resultados.
  - `erase_data(query: str) -> bool` — executa DELETEs.
  - `update_data(query: str) -> dict` — executa UPDATEs e retorna status + linhas afetadas.
  - `create_bar_chart(x: list, y: list, x_label: str, y_label: str) -> str` — prepara um payload JSON indicando um gráfico de barras (tipo `bar_chart`) que o app cliente pode desenhar (Streamlit).

Requisitos
- Python 3.8+
- MySQL Server (crie um banco `hbr_demo_db` ou atualize `servidor.py` com o nome usado).
- Ollama (opcional, para execução local de modelos) ou outro provedor LLM configurado no `app.py`.
- Dependências Python listadas em `requirements.txt`.

Configurações relevantes (atualizadas)
- Em `servidor.py`, a função `init_db()` usa por padrão:
  - user: `root`
  - password: `pass123`
  - host: `127.0.0.3`
  - database: `hbr_demo_db`

  Você pode alterar esses valores diretamente no arquivo ou adaptar para usar variáveis de ambiente. Se o banco de dados não existir, crie-o antes de iniciar o servidor:

  ```sql
  CREATE DATABASE IF NOT EXISTS hbr_demo_db;
  ```

Como executar (PowerShell)
-------------------------

1) Instale dependências Python

```powershell
python -m pip install -r requirements.txt
```

2) Configure MySQL

- Certifique-se que o MySQL está rodando e que a base `hbr_demo_db` existe. Atualize as credenciais/host em `servidor.py` se necessário.

3) (Opcional) Prepare modelo local ou em nuvem

- Se você pretende usar Ollama como provedor local de LLM, instale o Ollama e carregue o modelo desejado (ex.: `qwen3:4b`). Caso esteja usando OpenAI, defina `OPENAI_API_KEY` no seu ambiente (em um arquivo `.env`).

4) Inicie o servidor MCP

```powershell
python servidor.py --server_type=sse
```

5) Execute o app Streamlit (cliente)

```powershell
streamlit run app.py
```

Observações para o `app.py`
- O `app.py` cria um `FunctionAgent` usando Llama Index e busca as tools do MCP via `BasicMCPClient` apontando por padrão para `http://127.0.0.1:8000/sse`.
- O app espera que você tenha configurado um LLM compatível em `app.py`. Por padrão o código usa `OpenAI` com a variável de ambiente `OPENAI_API_KEY`.

Uso rápido
-----------

- Exemplo de chamada INSERT para `add_data`:

```sql
INSERT INTO tomografo (nomePaciente, idade, resultados)
VALUES ('Alice Guerra', 25, 'Retinopatia diabética');
```

- Exemplo de SELECT via `read_data` (retorna JSON):

```sql
SELECT * FROM tomografo;
```

- Exemplo de UPDATE via `update_data`:

```sql
UPDATE tomografo SET idade = 32 WHERE nomePaciente = 'Ana Beatriz';
```

Notas de troubleshooting
-----------------------
- Erro de conexão MySQL: verifique usuário/senha/host/porta e se o serviço do MySQL está ativo.
- Banco de dados não existe: crie `hbr_demo_db` manualmente ou atualize `servidor.py` para apontar para o banco correto.
- Problemas com Ollama: confirme que o modelo indicado está instalado e disponível localmente.
- Endpoint MCP: `app.py` e o notebook usam por padrão `http://127.0.0.1:8000/sse`. Atualize se você iniciar o servidor em outro host/porta.

Segurança e privacidade
-----------------------

- Este projeto é um exemplo/demo. Não armazene credenciais sensíveis no repositório. Use variáveis de ambiente ou um arquivo de configuração seguro para credenciais em produção.

Próximos passos sugeridos
-------------------------
- Adicionar um `LICENSE` apropriado.
- Incluir CI (ex.: GitHub Actions) para lint/testes.
- Adicionar exemplos automatizados e testes unitários para as ferramentas MCP.

Contribuição
------------

Sinta-se à vontade para abrir issues e pull requests. Para mudanças maiores, descreva o caso de uso e inclua testes reproduzíveis.

Arquivos principais modificados/compatíveis
----------------------------------------
- `servidor.py` — registra as ferramentas MCP: add_data, read_data, erase_data, update_data, create_bar_chart.
- `app.py` — app Streamlit que monta um FunctionAgent via Llama Index e consome as tools via `BasicMCPClient`.

Contato
-------

Projeto mantido pela equipe HBr - CIIA.
