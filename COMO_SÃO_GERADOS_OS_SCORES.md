# Como São Gerados os Scores

## 📊 Sistema de Pontuação

O **Status Geral** é calculado através de um sistema de pontuação simples, onde cada métrica que atinge sua meta adiciona **1 ponto** ao score total.

## ✅ Critérios de Pontuação

O sistema avalia **6 métricas** e adiciona 1 ponto para cada uma que atingir a meta:

1. **Taxa de Escape** ≤ 5%
2. **MTTR** ≤ 8 horas
3. **Taxa de Acerto** ≥ 85%
4. **Taxa de Sucesso dos Testes** ≥ 90%
5. **Bugs em Produção** (bugs fechados > bugs abertos)
6. **Aceitação de Histórias** ≥ 90%

**Nota:** A métrica **Taxa de Automação** permanece no sistema para exibição, mas não conta para o cálculo do score. A métrica **Falhas em Produção** também permanece no sistema para exibição, mas não conta para o cálculo do score.

## 📖 Explicação Detalhada das Métricas

### 1. Taxa de Escape ≤ 5%

**O que valida:**
Esta métrica mede a eficácia dos processos de teste ao identificar quantos bugs escaparam dos testes e chegaram à produção. Quanto menor a taxa, melhor a qualidade dos testes.

**Cálculo:**
```
Taxa de Escape (%) = (Bugs em Produção ÷ Total de Bugs Encontrados) × 100
```

**Onde:**
- **Bugs em Produção**: Soma de bugs abertos + bugs fechados em produção
- **Total de Bugs Encontrados**: Soma de todos os bugs encontrados durante o desenvolvimento (defeitos abertos + defeitos fechados) + bugs em produção

**Exemplo:**
- Defeitos encontrados no desenvolvimento: 80 (abertos + fechados)
- Bugs em produção: 4 (abertos + fechados)
- Total de bugs encontrados: 80 + 4 = 84
- Taxa de Escape: (4 ÷ 84) × 100 = 4.76% ✅ (dentro da meta)

**Meta:** ≤ 5% - Indica que menos de 5% dos bugs encontrados chegaram à produção, demonstrando boa eficácia dos testes.

---

### 5. Falhas em Produção = 0

**O que valida:**
Esta métrica valida se houve falhas detectadas em ambiente de produção durante o período analisado. O objetivo é ter zero falhas em produção, indicando que todos os problemas foram identificados antes do deploy.

**Cálculo:**
```
Falhas em Produção = Valor informado diretamente no campo "Falha em Produção"
```

**O que conta como Falha em Produção:**
- Falhas encontradas durante testes de validação em produção
- Falhas reportadas pelos usuários após o deploy
- Qualquer problema identificado no ambiente de produção

**Exemplo:**
- Falhas em Produção: 0 ✅ (meta atingida)
- Falhas em Produção: 1 ❌ (meta não atingida)

**Meta:** = 0 - O ideal é não ter nenhuma falha em produção, garantindo que todos os problemas foram detectados antes do deploy.

---

### 5. Bugs em Produção (bugs fechados > bugs abertos)

**O que valida:**
Esta métrica valida se a quantidade de bugs fechados (corrigidos) em produção é maior que a quantidade de bugs abertos (pendentes). Isso indica que o time está conseguindo resolver os bugs mais rapidamente do que novos bugs estão sendo reportados, demonstrando eficiência na correção.

**Cálculo:**
```
Bugs Fechados (Produção) > Bugs Abertos (Produção)
```

**Onde:**
- **Bugs Abertos (Produção)**: Bugs ainda não resolvidos em produção
- **Bugs Fechados (Produção)**: Bugs que foram corrigidos em produção

**Exemplo:**
- Bugs Abertos: 1
- Bugs Fechados: 2
- 2 > 1 ✅ (meta atingida)

**Meta:** Bugs Fechados > Bugs Abertos - Indica que o time está conseguindo corrigir os bugs em produção mais rapidamente do que novos bugs são reportados, demonstrando boa capacidade de resolução.

## 🎯 Classificação Final

O score total determina o status:

- **EXCELENTE**: Score ≥ 5 pontos
- **BOM**: Score ≥ 3 pontos
- **ATENÇÃO**: Score ≥ 2 pontos
- **CRÍTICO**: Score < 2 pontos

## 📝 Exemplo Prático

**Cenário:**
- Taxa de Escape: 3% ✅ (+1)
- MTTR: 6h ✅ (+1)
- Taxa de Automação: 75% (não conta para score)
- Taxa de Acerto: 80% ❌
- Taxa de Sucesso dos Testes: 92% ✅ (+1)
- Falhas em Produção: 0 (não conta para score)
- Bugs Abertos: 1, Bugs Fechados: 2 → 2 > 1 ✅ (+1)
- Aceitação de Histórias: 88% ❌

**Score Total:** 4 pontos → **Status: BOM**