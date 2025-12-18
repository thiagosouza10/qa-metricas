# Como São Gerados os Scores

O **Status Geral** é calculado através de um sistema de pontuação onde cada métrica que atinge sua meta adiciona **1 ponto** ao score total.

## Critérios de Pontuação

O sistema avalia **6 métricas** e adiciona 1 ponto para cada uma que atingir a meta:

1. **Taxa de Escape** ≤ 5%
2. **MTTR** ≤ 8 horas
3. **Taxa de Acerto** ≥ 85%
4. **Taxa de Sucesso dos Testes** ≥ 90%
5. **Bugs em Produção** (bugs fechados > bugs abertos)
6. **Aceitação de Histórias** ≥ 90%

## Classificação Final

O score total determina o status:

- **EXCELENTE**: Score ≥ 5 pontos
- **BOM**: Score ≥ 3 pontos
- **ATENÇÃO**: Score ≥ 2 pontos
- **CRÍTICO**: Score < 2 pontos