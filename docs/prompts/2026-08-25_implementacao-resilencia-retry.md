# Log de Prompt — Resiliência: Timeout e Retry nas Tools

**Data:** 2026-08-25  
**Tarefa:** Card #47 do Kanban — `[Resiliência] Adicionar Timeout e Retry nas Tools`  
**Branch:** `feature/resilencia-tools`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/47

---

## Prompt Enviado pelo Usuário

> Vamos para o Card #47

---

## Objetivo da Tarefa

Configurar tratamento de falhas nas chamadas HTTP das tools: se o backend estiver fora, a API lança um erro tratado após 3 retentativas com backoff exponencial. Distinguir timeout de erro de conexão de erro HTTP para mensagens claras ao agente.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar contra seção 4.6 do documento de avaliação (Observabilidade e resiliência — tratamento básico de falhas com timeout, retry limitado ou fallback).
- **Segurança:** Não versionar `.env`.
- **Branch:** Criar a partir de `develop`.

---

## Decisões Técnicas

1. **`urllib3.Retry` + `HTTPAdapter`:** Solução nativa do ecossistema `requests` para retry com backoff. Evita implementação manual de loop de retry.

2. **Duas sessions separadas (leitura vs escrita):** GET (idempotente) recebe retry completo com `status_forcelist=[500,502,503,504]`. POST (não-idempotente) recebe retry apenas em falhas de conexão, sem retry em status 5xx, evitando criação de eventos duplicados no backend.

3. **Backoff fator 0.5:** Delays entre retentativas: 0s → 0.5s → 1s. Rápido o suficiente para UX aceitável, mas com espaço para o backend se recuperar de falhas transitórias.

4. **Tratamento de erros granular:** `Timeout` → mensagem de timeout, `ConnectionError` → backend indisponível, `HTTPError` → status code com detalhes, `RequestException` genérico como fallback.

5. **Documentação em `docs/technicalDocs/resiliencia-retry.md`:** Estratégia detalhada, diagrama de decisão e instruções de teste.
