# Como São Gerados os Scores

## 📊 Sistema de Pontuação

O **Status Geral** é calculado através de um sistema de pontuação simples, onde cada métrica que atinge sua meta adiciona **1 ponto** ao score total.

## ✅ Critérios de Pontuação

O sistema avalia **7 métricas** e adiciona 1 ponto para cada uma que atingir a meta:

1. **Taxa de Escape** ≤ 5%
2. **MTTR** ≤ 8 horas
3. **Taxa de Acerto** ≥ 85%
4. **Taxa de Sucesso dos Testes** ≥ 90%
5. **Falhas em Produção** = 0
6. **Bugs em Produção** (abertos + fechados) ≤ 3
7. **Aceitação de Histórias** ≥ 90%

**Nota:** A métrica **Taxa de Automação** permanece no sistema para exibição, mas não conta para o cálculo do score.

## 🎯 Classificação Final

O score total determina o status:

- **EXCELENTE**: Score ≥ 5 pontos
- **BOM**: Score ≥ 4 pontos
- **ATENÇÃO**: Score ≥ 2 pontos
- **CRÍTICO**: Score < 2 pontos

## 📝 Exemplo Prático

**Cenário:**
- Taxa de Escape: 3% ✅ (+1)
- MTTR: 6h ✅ (+1)
- Taxa de Automação: 75% (não conta para score)
- Taxa de Acerto: 80% ❌
- Taxa de Sucesso dos Testes: 92% ✅ (+1)
- Falhas em Produção: 0 ✅ (+1)
- Bugs em Produção: 2 ✅ (+1)
- Aceitação de Histórias: 88% ❌

**Score Total:** 5 pontos → **Status: EXCELENTE**