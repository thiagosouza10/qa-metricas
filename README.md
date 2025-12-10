# 📊 Dashboard ARGO - Métricas QA

## 🎯 Visão Geral

Solução **HTML5 + CSS3 + Bootstrap 5 + JavaScript** para métricas essenciais de QA, com foco em **rastreamento detalhado de falhas durante o ciclo completo de desenvolvimento** e apresentações profissionais para reviews.

### 🌐 **Acesso Online**
- **GitHub Pages**: [https://thiagosouza10.github.io/qa-metricas/dashboard.html](https://thiagosouza10.github.io/qa-metricas/dashboard.html)
- **Documentação Argo Quality**: [Confluence - Argo Quality](https://useargo.atlassian.net/wiki/spaces/QA/pages/3556769900/Argo+Quality)

### 🎯 **Objetivo Principal**

Esta versão do dashboard foi criada para **facilitar a vida do QA** na coleta, análise e apresentação de métricas essenciais durante **cerimônias de retrospectiva** e **reuniões com stakeholders**. O foco é fornecer uma ferramenta **simples, rápida e profissional** que permita ao QA apresentar dados de qualidade de forma visual e impactante, com **rastreamento detalhado de falhas em cada fase do ciclo de desenvolvimento**.

### 🛡️ **Sobre o Argo Quality**

O **Argo Quality** tem como objetivo garantir que a qualidade seja **contínua e colaborativa**, integrando práticas de teste e validação desde o início do desenvolvimento até o deploy, com **responsabilidade compartilhada entre todo o time**.

## ✨ Características Principais

### 🚀 **Simplicidade Total**
- **Zero configuração** - Abra o `dashboard.html` e pronto!
- **Sem dependências complexas** - Apenas CDNs públicos
- **Interface intuitiva** - QA pode usar imediatamente
- **Branding Argo** - Identidade visual personalizada

### 📊 **Métricas Essenciais**

O dashboard está organizado em **três tópicos principais**:

#### 🔴 **1. Falhas durante o Ciclo de Desenvolvimento**

Esta métrica rastreia todos os tipos de falhas identificadas durante o ciclo completo de desenvolvimento, desde a fase de requisitos até a produção.

**Tipos de Falhas:**
- **Falha de Requisito** - Problemas identificados na fase de requisitos
- **Falha Manual Pré-Release** - Falhas encontradas em testes manuais durante desenvolvimento
- **Falha Automatizada Pré-Release** - Falhas detectadas por testes automatizados durante desenvolvimento
- **Falha Manual Release** - Falhas encontradas em testes manuais de validação da release
- **Falha Automatizada Release** - Falhas detectadas por testes automatizados na validação da release
- **Falha em Produção** - Falhas encontradas em ambiente de produção

**Objetivo:**
- Identificar em qual fase do ciclo as falhas são detectadas
- Melhorar os processos de teste
- Reduzir falhas em produção
- **Quanto mais cedo as falhas forem detectadas, menor o custo de correção**

#### 🎯 **2. Métricas Críticas**

Métricas essenciais que impactam diretamente a qualidade do produto:

- **Taxa de Escape** (< 5%) - Percentual de bugs que chegam à produção
  - **Cálculo**: (Bugs em Produção ÷ Total de Bugs Encontrados) × 100
  - **Classificação**:
    - EXCELENTE: < 3%
    - BOM: 3% a 5%
    - ATENÇÃO: 5% a 8%
    - CRÍTICO: > 8%

- **MTTR** (< 8h) - Tempo médio de resolução de bugs
  - **Cálculo**: Soma dos tempos de resolução ÷ Número de bugs resolvidos
  - **Classificação**:
    - EXCELENTE: < 4h
    - BOM: 4h a 8h
    - ATENÇÃO: 8h a 12h
    - CRÍTICO: > 12h

- **Aceitação de Histórias de Usuário** (>= 90%) - Percentual de histórias aceitas pelo PO
  - **Cálculo**: (Histórias Aceitas ÷ Histórias Totais) × 100
  - **Classificação**:
    - EXCELENTE: 90% a 100% - Times maduros, bom refinamento, critérios claros, QA e Dev bem alinhados
    - BOM: 80% a 89% - Ainda existem algumas estórias com problemas, mas o processo funciona bem
    - ATENÇÃO: 70% a 79% - Sinais de falta de clareza, retrabalho aumentou, refinamento inconsistente
    - CRÍTICO: < 70% - Muitas estórias retornando, critérios ruins, fluxo desorganizado, QA/Dev desalinhados

#### 🔴 **Falhas Por Prioridade**

Esta métrica rastreia a distribuição de falhas identificadas durante o ciclo de desenvolvimento, classificadas por nível de prioridade.

**Prioridades:**
- **Trivial**: Falhas com impacto mínimo, não afetam funcionalidades críticas
- **Média**: Falhas com impacto moderado, afetam funcionalidades secundárias
- **Gravíssima**: Falhas com alto impacto, afetam funcionalidades importantes
- **Crítica**: Falhas que impedem o uso de funcionalidades essenciais ou causam perda de dados

**Objetivo:**
- Identificar a distribuição de falhas por prioridade
- Priorizar esforços de correção
- Entender o impacto das falhas encontradas

#### 🐛 **Bugs Por Prioridade**

Esta métrica rastreia a distribuição de bugs encontrados em produção, classificados por nível de prioridade.

**Prioridades:**
- **Trivial**: Bugs com impacto mínimo, não afetam funcionalidades críticas
- **Média**: Bugs com impacto moderado, afetam funcionalidades secundárias
- **Gravíssima**: Bugs com alto impacto, afetam funcionalidades importantes
- **Crítica**: Bugs que impedem o uso de funcionalidades essenciais ou causam perda de dados

**Objetivo:**
- Identificar a distribuição de bugs por prioridade em produção
- Priorizar esforços de correção
- Entender o impacto dos bugs reportados pelos usuários

#### ⚡ **4. Métricas de Eficiência**

Métricas que indicam a eficiência dos processos de teste:

- **Taxa de Automação** (> 70%) - Percentual de testes automatizados
  - **Classificação**:
    - EXCELENTE: > 80%
    - BOM: 70% a 80%
    - ATENÇÃO: 50% a 70%
    - CRÍTICO: < 50%

- **Taxa de Acerto** (> 85%) - Percentual de bugs válidos reportados
  - **Cálculo**: (Bugs Válidos ÷ Total de Bugs Reportados) × 100
  - **Classificação**:
    - EXCELENTE: > 90%
    - BOM: 85% a 90%
    - ATENÇÃO: 75% a 85%
    - CRÍTICO: < 75%

- **Defeitos vs Bugs**
  - **Defeitos (Desenvolvimento)**: Problemas encontrados e corrigidos antes do deploy
    - Abertos: Defeitos ainda não resolvidos
    - Fechados: Defeitos corrigidos antes do deploy
  - **Bugs (Produção)**: Problemas encontrados em ambiente de produção pelos usuários
    - Abertos: Bugs ainda não resolvidos
    - Fechados: Bugs corrigidos em produção

### 🎨 **Interface Moderna**
- **Design Clean** com Bootstrap 5
- **Responsivo** - Funciona em qualquer dispositivo
- **Gráficos Interativos** com Chart.js
- **Cores Intuitivas** - Verde (bom), Amarelo (atenção), Vermelho (crítico)
- **Logo Argo** - Identidade visual personalizada
- **Organização por Tópicos** - Métricas agrupadas logicamente

### 📋 **Funcionalidades para Reviews**
- **Entrada Simples** - QA digita os valores
- **Cálculo Automático** - Sistema calcula métricas derivadas
- **Status Visual** - EXCELENTE, BOM, ATENÇÃO, CRÍTICO
- **Pontos Positivos/Atenção** - Resumo automático baseado nas métricas
- **Gráficos Dinâmicos** - Visualizações interativas
- **Avisos Inteligentes** - Alertas automáticos sobre falhas críticas
- **Resumo de Análise** - Análise automática com pontos positivos e de atenção

### 💾 **Exportação de Relatórios**
- **PDF Profissional** - Relatório completo organizado por tópicos:
  - **Página 1**: Falhas durante o Ciclo de Desenvolvimento
  - **Página 2**: Métricas Críticas + Métricas de Eficiência
  - **Página 3**: Comparação Métricas VS Metas + Resumo de Análise
- **Salvamento Local** - Persistência no navegador
- **Arquivo automático** - Nome inclui data e hora

## 🚀 Como Usar o Dashboard

### 🌐 **Acesso Online (Recomendado)**
1. **Acesse**: [https://thiagosouza10.github.io/qa-metricas/dashboard.html](https://thiagosouza10.github.io/qa-metricas/dashboard.html)
2. **Não precisa instalar nada** - Funciona direto no navegador

### 📋 **Passo a Passo Detalhado**

#### **1. Entrada de Dados**
- Acesse a seção **"Entrada de Métricas QA"**
- **Leia a seção "Guia de Uso"** para entender cada métrica
- Preencha os campos com os valores do seu período de análise:

##### **🔴 Falhas durante o Ciclo de Desenvolvimento**
- **Falha de Requisito**: Problemas identificados na documentação de requisitos
- **Falha Manual Pré-Release**: Falhas encontradas em testes manuais durante desenvolvimento
- **Falha Automatizada Pré-Release**: Falhas detectadas por testes automatizados durante desenvolvimento
- **Falha Manual Release**: Falhas encontradas em testes manuais de validação da release
- **Falha Automatizada Release**: Falhas detectadas por testes automatizados na validação da release
- **Falha em Produção**: Falhas encontradas em ambiente de produção

##### **🎯 Métricas Críticas**
- **Taxa de Escape**: Percentual de bugs que chegaram à produção
- **MTTR**: Tempo médio para resolução de bugs (em horas)
- **Histórias de Usuário Totais**: Total de histórias de usuário no período
- **Histórias de Usuário Aceitas**: Histórias aceitas pelo PO (atendem todos os critérios de aceitação do DOD)

##### **🔴 Falhas Por Prioridade**
- **Falhas - Trivial**: Quantidade de falhas com prioridade trivial
- **Falhas - Média**: Quantidade de falhas com prioridade média
- **Falhas - Gravíssima**: Quantidade de falhas com prioridade gravíssima
- **Falhas - Crítica**: Quantidade de falhas com prioridade crítica

##### **🐛 Bugs Por Prioridade**
- **Bugs - Trivial**: Quantidade de bugs com prioridade trivial
- **Bugs - Média**: Quantidade de bugs com prioridade média
- **Bugs - Gravíssima**: Quantidade de bugs com prioridade gravíssima
- **Bugs - Crítica**: Quantidade de bugs com prioridade crítica

##### **⚡ Métricas de Eficiência**
- **Taxa de Automação**: Percentual de testes automatizados
- **Taxa de Acerto**: Percentual de bugs válidos reportados
- **Defeitos Abertos/Fechados**: Problemas em ambiente de desenvolvimento
- **Bugs Abertos/Fechados**: Problemas em ambiente de produção

- Clique em **"Calcular Métricas"**

#### **2. Visualização do Dashboard**
- O dashboard é **gerado automaticamente** e organizado em tópicos:
- **Status Geral**: EXCELENTE, BOM, ATENÇÃO ou CRÍTICO
- **Falhas durante o Ciclo**: Visualização detalhada de falhas por fase
- **Métricas Principais**: Cards com valores, progress bars e comparação com metas
- **Gráficos Interativos**: 
  - Distribuição de Falhas (bar chart)
  - Defeitos vs Bugs (doughnut chart)
  - Comparação com Metas (bar chart)
- **Análise Automática**: Pontos positivos e de atenção
- **Avisos Inteligentes**: Alertas sobre falhas críticas
- **Resumo de Análise**: Análise completa com pontos positivos e de atenção

#### **3. Geração de Relatórios PDF**
- Vá para a seção **"Relatório"**
- Preencha informações adicionais:
  - **Equipe Responsável**
  - **Período de Análise**
  - **Observações Adicionais** (opcional)
- **Gerar PDF**: Cria relatório profissional organizado por tópicos:
  - Cada tópico em sua própria página
  - Inclui todos os gráficos e métricas
  - Inclui mensagens de parabéns e atenção
  - Inclui o Resumo de Análise completo
- **Arquivo automático**: Nome inclui data e hora

### 🎯 **Casos de Uso Práticos**

#### **Sprint Review**
1. **Coleta métricas** do sprint finalizado
2. **Analisa falhas** por fase do ciclo de desenvolvimento
3. **Gera PDF** com resumo executivo
4. **Apresenta** pontos positivos e de atenção
5. **Compartilha** relatório com stakeholders

#### **Retrospectiva de Time**
1. **Analisa tendências** das métricas
2. **Identifica** em qual fase as falhas são mais frequentes
3. **Compara** com metas estabelecidas
4. **Avalia** aceitação de histórias de usuário
5. **Define** ações para melhorar detecção precoce de falhas

#### **Reunião com Liderança**
1. **Prepara** métricas do período
2. **Destaque** a distribuição de falhas por fase
3. **Gera relatório** profissional em PDF
4. **Apresenta** status visual claro
5. **Distribui** PDF para acompanhamento

## 📁 Estrutura do Projeto

```
qa-metricas/
├── dashboard.html    # Página principal
├── js/
│   └── dashboard.js  # Lógica JavaScript (cálculos, gráficos, PDF)
├── images/
│   └── argo-logo.png      # Logo Argo
└── README.md         # Este arquivo
```

## 📊 Métricas Implementadas

### **🔴 Tópico 1: Falhas durante o Ciclo de Desenvolvimento**

Esta métrica rastreia todos os tipos de falhas identificadas durante o ciclo completo de desenvolvimento, desde a fase de requisitos até a produção.

#### **Tipos de Falhas:**
1. **Falha de Requisito** - Problemas identificados durante análise ou revisão de requisitos
2. **Falha Manual Pré-Release** - Falhas encontradas em testes manuais durante desenvolvimento
3. **Falha Automatizada Pré-Release** - Falhas detectadas por testes automatizados durante desenvolvimento
4. **Falha Manual Release** - Falhas encontradas em testes manuais de validação da release
5. **Falha Automatizada Release** - Falhas detectadas por testes automatizados na validação da release
6. **Falha em Produção** - Falhas encontradas em ambiente de produção

#### **Objetivo:**
- Identificar em qual fase do ciclo as falhas são detectadas
- Melhorar os processos de teste
- Reduzir falhas em produção
- **Quanto mais cedo as falhas forem detectadas, menor o custo de correção**

### **🎯 Tópico 2: Métricas Críticas**

#### **1. Taxa de Escape** (< 5%)
- **Definição**: Percentual de bugs que chegam à produção
- **Cálculo**: (Bugs em Produção ÷ Total de Bugs Encontrados) × 100
- **Meta**: < 5%
- **Classificação**:
  - EXCELENTE: < 3%
  - BOM: 3% a 5%
  - ATENÇÃO: 5% a 8%
  - CRÍTICO: > 8%

#### **2. MTTR** (< 8h)
- **Definição**: Tempo médio para resolução de bugs
- **Cálculo**: Soma dos tempos de resolução ÷ Número de bugs resolvidos
- **Meta**: < 8 horas
- **Classificação**:
  - EXCELENTE: < 4h
  - BOM: 4h a 8h
  - ATENÇÃO: 8h a 12h
  - CRÍTICO: > 12h

#### **3. Aceitação de Histórias de Usuário** (>= 90%)
- **Definição**: Percentual de histórias de usuário que atendem todos os critérios de aceitação definidos no DOD (Definition of Done) e estão aptas a ir para produção
- **Cálculo**: (Histórias Aceitas ÷ Histórias Totais) × 100
- **Exemplo**: 10 estórias de usuário dentro de uma sprint ou período, sendo que 9 foram aceitas pelo PO = 90% de aceitação
- **Meta**: >= 90%
- **Classificação**:
  - **EXCELENTE** (90% a 100%): Times maduros, bom refinamento, critérios claros, QA e Dev bem alinhados
  - **BOM** (80% a 89%): Ainda existem algumas estórias com problemas, mas o processo funciona bem
  - **ATENÇÃO** (70% a 79%): Sinais de falta de clareza, retrabalho aumentou, refinamento inconsistente
  - **CRÍTICO** (< 70%): Muitas estórias retornando, critérios ruins, fluxo desorganizado, QA/Dev desalinhados

### **⚡ Tópico 3: Métricas de Eficiência**

#### **1. Taxa de Automação** (> 70%)
- **Definição**: Percentual de testes automatizados
- **Meta**: > 70%
- **Classificação**:
  - EXCELENTE: > 80%
  - BOM: 70% a 80%
  - ATENÇÃO: 50% a 70%
  - CRÍTICO: < 50%

#### **2. Taxa de Acerto** (> 85%)
- **Definição**: Percentual de bugs válidos reportados
- **Cálculo**: (Bugs Válidos ÷ Total de Bugs Reportados) × 100
- **Meta**: > 85%
- **Classificação**:
  - EXCELENTE: > 90%
  - BOM: 85% a 90%
  - ATENÇÃO: 75% a 85%
  - CRÍTICO: < 75%

#### **3. Defeitos vs Bugs**
- **Defeitos (Desenvolvimento)**: Problemas encontrados e corrigidos antes do deploy
  - **Abertos**: Defeitos ainda não resolvidos em ambiente de desenvolvimento
  - **Fechados**: Defeitos corrigidos antes do deploy
- **Bugs (Produção)**: Problemas encontrados em ambiente de produção pelos usuários
  - **Abertos**: Bugs ainda não resolvidos em produção
  - **Fechados**: Bugs corrigidos em produção
- **Diferença**: Defeitos são corrigidos antes do deploy, Bugs chegam aos usuários

### **📈 Métricas Derivadas (Calculadas Automaticamente)**
- **Total de Falhas** - Soma de todas as falhas do ciclo
- **Taxa de Correção de Defects** - Eficiência na correção de problemas de desenvolvimento
- **Taxa de Correção de Bugs** - Eficiência na correção de problemas de produção
- **Status Geral** - Classificação geral baseada em todas as métricas
- **Pontos Positivos** - Análise automática dos pontos fortes
- **Pontos de Atenção** - Análise automática dos pontos de melhoria

### **📊 Gráficos Disponíveis**
1. **Distribuição de Falhas** - Gráfico de barras mostrando a distribuição de falhas por tipo
2. **Defeitos vs Bugs** - Gráfico de rosca mostrando a comparação entre defeitos e bugs
3. **Comparação com Metas** - Gráfico de barras comparando valores atuais com metas estabelecidas

## 📝 Notas Importantes

### **Classificação de Falhas**
- Classifique cada falha na fase **mais precoce** onde foi detectada
- Se uma falha foi detectada em pré-release, não conte em produção
- O objetivo é identificar onde as falhas são **primeiro detectadas**

### **Aceitação de Histórias de Usuário**
- Uma história é considerada aceita quando atende **todos os critérios de aceitação** definidos no DOD (Definition of Done)
- A história deve estar **apta a ir para produção**
- Conte apenas histórias que foram **efetivamente aceitas pelo PO**

### **Consistência de Dados**
- Use sempre o mesmo período para todas as métricas
- Mantenha registros detalhados para análise de tendências
- Adicione observações sobre eventos especiais que podem ter afetado as métricas

### **Foco em Produção**
- Priorize reduzir falhas em produção - este é o indicador mais crítico
- Quanto mais cedo as falhas forem detectadas, menor o impacto
- A aceitação de histórias de usuário indica a maturidade do processo de desenvolvimento

## 🔗 Links Úteis

- **Dashboard Online**: [https://thiagosouza10.github.io/qa-metricas/dashboard.html](https://thiagosouza10.github.io/qa-metricas/dashboard.html)
- **Documentação Argo Quality**: [Confluence - Argo Quality](https://useargo.atlassian.net/wiki/spaces/QA/pages/3556769900/Argo+Quality)

## 📄 Licença

Este projeto é de uso interno da equipe Argo.
