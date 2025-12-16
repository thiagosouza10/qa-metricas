# Como São Gerados os Scores

## 📊 Sistema de Pontuação

O **Status Geral** é calculado através de um sistema de pontuação simples, onde cada métrica que atinge sua meta adiciona **1 ponto** ao score total.

## ✅ Critérios de Pontuação

O sistema avalia **8 métricas** e adiciona 1 ponto para cada uma que atingir a meta:

1. **Taxa de Escape** ≤ 5%
2. **MTTR** ≤ 8 horas
3. **Taxa de Automação** ≥ 70%
4. **Taxa de Acerto** ≥ 85%
5. **Taxa de Sucesso dos Testes** ≥ 90%
6. **Falhas em Produção** = 0
7. **Bugs em Produção** (abertos + fechados) ≤ 3
8. **Aceitação de Histórias** ≥ 90%

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
- Taxa de Automação: 75% ✅ (+1)
- Taxa de Acerto: 80% ❌
- Taxa de Sucesso dos Testes: 92% ✅ (+1)
- Falhas em Produção: 0 ✅ (+1)
- Bugs em Produção: 2 ✅ (+1)
- Aceitação de Histórias: 88% ❌

**Score Total:** 6 pontos → **Status: EXCELENTE**