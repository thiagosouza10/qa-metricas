# 📊 Dashboard Argo - Métricas QA (Nova Versão)

## 🎯 Visão Geral

Solução **HTML5 + CSS3 + Bootstrap 5 + JavaScript** para métricas essenciais de QA, com foco em **rastreamento detalhado de falhas durante o ciclo completo de desenvolvimento** e apresentações profissionais para reviews.

### 🌐 **Acesso Online**
- **GitHub Pages**: [https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html](https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html)
- **Repositório**: [https://github.com/Bella5900g/qa-metrics-dashboard](https://github.com/Bella5900g/qa-metrics-dashboard)

### 🎯 **Objetivo Principal**
Esta versão do dashboard foi criada para **facilitar a vida do QA** na coleta, análise e apresentação de métricas essenciais durante **cerimônias de review** e **reuniões com stakeholders**. O foco é fornecer uma ferramenta **simples, rápida e profissional** que permita ao QA apresentar dados de qualidade de forma visual e impactante, com **rastreamento detalhado de falhas em cada fase do ciclo de desenvolvimento**.

## ✨ Características Principais

### 🚀 **Simplicidade Total**
- **Zero configuração** - Abra o `dashboard.html` e pronto!
- **Sem dependências complexas** - Apenas CDNs públicos
- **Interface intuitiva** - QA pode usar imediatamente
- **Branding Argo** - Identidade visual personalizada

### 📊 **Métricas Essenciais**

#### 🔴 **Métrica 1: Falhas durante o Ciclo de Desenvolvimento** (NOVO)
- **Falha de Requisito** - Problemas identificados na fase de requisitos
- **Falha Manual Pré-Release** - Falhas encontradas em testes manuais durante desenvolvimento
- **Falha Automatizada Pré-Release** - Falhas detectadas por testes automatizados durante desenvolvimento
- **Falha Manual Release** - Falhas encontradas em testes manuais de validação da release
- **Falha Automatizada Release** - Falhas detectadas por testes automatizados na validação da release
- **Falha em Produção** - Falhas encontradas em ambiente de produção

#### 🎯 **Métricas Críticas (Tier 1)**
- **Taxa de Escape** (< 5%) - Percentual de bugs que chegam à produção
- **MTTR** (< 8h) - Tempo médio de resolução de bugs

#### ⚡ **Métricas de Eficiência (Tier 2)**
- **Taxa de Automação** (> 70%) - Percentual de testes automatizados
- **Taxa de Acerto** (> 85%) - Percentual de bugs válidos reportados
- **Defects vs Bugs** - Status de problemas em desenvolvimento e produção

### 🎨 **Interface Moderna**
- **Design Clean** com Bootstrap 5
- **Responsivo** - Funciona em qualquer dispositivo
- **Gráficos Interativos** com Chart.js
- **Cores Intuitivas** - Verde (bom), Amarelo (atenção), Vermelho (crítico)
- **Logo Argo** - Identidade visual personalizada

### 📋 **Funcionalidades para Reviews**
- **Entrada Simples** - QA digita os valores
- **Cálculo Automático** - Sistema calcula métricas derivadas
- **Status Visual** - EXCELENTE, BOM, ATENÇÃO, CRÍTICO
- **Pontos Positivos/Atenção** - Resumo automático
- **Gráficos Dinâmicos** - Visualizações interativas
- **Avisos Inteligentes** - Alertas automáticos sobre falhas críticas

### 💾 **Exportação Completa**
- **PDF Profissional** - Relatório completo com data/hora
- **JSON** - Dados estruturados para integração
- **Salvamento Local** - Persistência no navegador

## 🚀 Como Usar o Dashboard

### 🌐 **Opção 1: Acesso Online (Recomendado)**
1. **Acesse**: [https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html](https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html)
2. **Não precisa instalar nada** - Funciona direto no navegador
3. **Sempre atualizado** - Última versão disponível

### 💻 **Opção 2: Uso Local**
```bash
# Clone o repositório
git clone https://github.com/Bella5900g/qa-metrics-dashboard.git
cd qa-metrics-dashboard

# Simplesmente abra o arquivo dashboard.html no navegador
open dashboard.html
# ou
# Clique duplo no arquivo dashboard.html
```

### 📋 **Passo a Passo Detalhado**

#### **1. Entrada de Dados**
- Acesse a seção **"Entrada de Métricas QA"**
- **Leia a seção "Ajuda dos Campos"** para entender cada métrica
- Preencha os campos com os valores do seu período de análise:

##### **🔴 Falhas durante o Ciclo de Desenvolvimento** (NOVO)
- **Falha de Requisito**: Problemas identificados na documentação de requisitos
- **Falha Manual Pré-Release**: Falhas encontradas em testes manuais durante desenvolvimento
- **Falha Automatizada Pré-Release**: Falhas detectadas por testes automatizados durante desenvolvimento
- **Falha Manual Release**: Falhas encontradas em testes manuais de validação da release
- **Falha Automatizada Release**: Falhas detectadas por testes automatizados na validação da release
- **Falha em Produção**: Falhas encontradas em ambiente de produção

##### **🎯 Métricas Críticas**
- **Taxa de Escape**: Percentual de bugs que chegaram à produção
- **MTTR**: Tempo médio para resolução de bugs (em horas)

##### **⚡ Métricas de Eficiência**
- **Taxa de Automação**: Percentual de testes automatizados
- **Taxa de Acerto**: Percentual de bugs válidos reportados
- **Defects Abertos/Fechados**: Problemas em ambiente de desenvolvimento
- **Bugs Abertos/Fechados**: Problemas em ambiente de produção

- Clique em **"Calcular Métricas"**

#### **2. Visualização do Dashboard**
- O dashboard é **gerado automaticamente**
- **Status Geral**: EXCELENTE, BOM, ATENÇÃO ou CRÍTICO
- **Falhas durante o Ciclo**: Visualização detalhada de falhas por fase
- **Métricas Principais**: Cards com valores e comparação com metas
- **Gráficos Interativos**: 
  - Distribuição de Falhas (bar chart)
  - Defects vs Bugs (pizza chart)
  - Comparação com Metas (bar chart)
- **Análise Automática**: Pontos positivos e de atenção
- **Avisos Inteligentes**: Alertas sobre falhas críticas

#### **3. Geração de Relatórios**
- Vá para a seção **"Relatório"**
- Preencha informações adicionais:
  - **Equipe Responsável**
  - **Período de Análise**
  - **Observações Adicionais**
- **Gerar PDF**: Cria relatório profissional com todas as métricas
- **Exportar JSON**: Dados estruturados para integração
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
4. **Define** ações para melhorar detecção precoce de falhas

#### **Reunião com Liderança**
1. **Prepara** métricas do período
2. **Destaque** a distribuição de falhas por fase
3. **Gera relatório** profissional
4. **Apresenta** status visual claro
5. **Distribui** PDF para acompanhamento

## 📁 Estrutura do Projeto

```
qa-metrics-dashboard/
├── dashboard.html    # Página principal
├── js/
│   └── dashboard.js  # Lógica JavaScript
├── images/
│   └── argo-logo.png      # Logo Argo
└── README.md         # Este arquivo
```

## 🌐 Hospedagem e Deploy

### **GitHub Pages**
- **URL**: [https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html](https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html)

### **Estrutura para Deploy**
```
qa-metrics-dashboard/
├── dashboard.html    # Página principal
├── js/
│   └── dashboard.js  # Lógica JavaScript
├── images/
│   └── argo-logo.png      # Logo Argo
└── README.md         # Documentação
```

## 🎯 Para Quem Foi Criado

### **👨‍💼 Líderes de QA**
- **Apresentações** em reviews e retrospectivas
- **Relatórios** executivos para stakeholders
- **Métricas** essenciais em formato visual
- **Análise** rápida do status da qualidade
- **Rastreamento** de falhas por fase do ciclo

### **🧪 Analistas de QA**
- **Coleta** fácil de métricas do período
- **Cálculo** automático de indicadores
- **Visualização** clara dos resultados
- **Exportação** para análises detalhadas
- **Identificação** de fases críticas do ciclo

### **👥 Times de Desenvolvimento**
- **Transparência** total das métricas de qualidade
- **Foco** nas metas importantes
- **Melhoria** contínua baseada em dados
- **Comunicação** eficaz sobre qualidade
- **Entendimento** de onde as falhas são detectadas

### **🏢 Stakeholders e Gestores**
- **Relatórios** profissionais para apresentações
- **Status** visual claro e objetivo
- **Métricas** padronizadas e comparáveis
- **Dados** estruturados para tomada de decisão
- **Visibilidade** do ciclo completo de desenvolvimento

## 📊 Métricas Implementadas

### **🔴 Métrica 1: Falhas durante o Ciclo de Desenvolvimento** (NOVO)

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

### **🎯 Métricas Críticas (Tier 1)**
1. **Taxa de Escape** (< 5%) - Percentual de bugs que chegam à produção
2. **MTTR** (< 8h) - Tempo médio para resolução de bugs

### **⚡ Métricas de Eficiência (Tier 2)**
3. **Taxa de Automação** (> 70%) - Percentual de testes automatizados
4. **Taxa de Acerto** (> 85%) - Percentual de bugs válidos reportados

### **🐛 Status de Qualidade**
5. **Defects Abertos** - Problemas em ambiente de desenvolvimento
6. **Defects Fechados** - Problemas corrigidos antes do deploy
7. **Bugs Abertos** - Problemas em ambiente de produção
8. **Bugs Fechados** - Problemas corrigidos em produção

### **📈 Métricas Derivadas (Calculadas Automaticamente)**
- **Total de Falhas** - Soma de todas as falhas do ciclo
- **Taxa de Correção de Defects** - Eficiência na correção de problemas de desenvolvimento
- **Taxa de Correção de Bugs** - Eficiência na correção de problemas de produção
- **Status Geral** - Classificação geral baseada em todas as métricas
- **Pontos Positivos** - Análise automática dos pontos fortes
- **Pontos de Atenção** - Análise automática dos pontos de melhoria

## 🎨 Interface Destacada

### **Design Responsivo**
- **Desktop** - Layout completo com gráficos
- **Tablet** - Adaptação inteligente
- **Mobile** - Interface otimizada para touch

### **Elementos Visuais**
- **Cards com Sombras** - Profundidade visual
- **Progress Bars** - Indicadores de progresso
- **Badges Coloridos** - Status instantâneo
- **Gráficos Interativos** - Exploração de dados
- **Avisos Inteligentes** - Alertas contextuais

### **Cores Intuitivas**
- 🟢 **Verde** - Excelente/Bom
- 🟡 **Amarelo** - Atenção
- 🔴 **Vermelho** - Crítico
- 🔵 **Azul** - Informativo

### **Branding Argo**
- Logo personalizado na navbar
- Identidade visual consistente
- Interface profissional

## 💡 Vantagens da Solução

### **Para o QA**
- ✅ **Zero curva de aprendizado**
- ✅ **Interface familiar** (formulários web)
- ✅ **Resultados instantâneos**
- ✅ **Relatórios profissionais**
- ✅ **Rastreamento detalhado** de falhas por fase

### **Para a Liderança**
- ✅ **Métricas essenciais** em destaque
- ✅ **Status visual** claro
- ✅ **Relatórios exportáveis** para apresentações
- ✅ **Dados estruturados** para análise
- ✅ **Visibilidade** do ciclo completo de desenvolvimento

### **Para o Time**
- ✅ **Transparência** total das métricas
- ✅ **Foco nas metas** importantes
- ✅ **Melhoria contínua** baseada em dados
- ✅ **Comunicação eficaz** em reviews
- ✅ **Identificação** de fases críticas do ciclo

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos e responsivos
- **Bootstrap 5** - Framework CSS responsivo
- **JavaScript ES6+** - Lógica interativa
- **Chart.js** - Gráficos interativos
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de gráficos para PDF
- **Bootstrap Icons** - Ícones modernos

## 🆕 Diferenças da Versão Original

### **Principais Melhorias:**
1. **Métrica de Falhas por Fase** - Rastreamento detalhado de falhas durante todo o ciclo
2. **Avisos Inteligentes** - Alertas automáticos sobre falhas críticas
3. **Branding Argo** - Identidade visual personalizada
4. **Interface Aprimorada** - Design mais moderno e intuitivo
5. **Guia de Uso Detalhado** - Seção completa explicando cada campo
6. **Gráficos Melhorados** - Visualizações mais informativas

### **Métricas Adicionais:**
- **Falhas durante o Ciclo de Desenvolvimento** (6 tipos diferentes)
- **Total de Falhas** (calculado automaticamente)
- **Análise de Fase** (identificação de onde as falhas são detectadas)

## 🎉 Resultado Final

Uma solução **simples, elegante e funcional** que permite ao QA:

1. **Inserir métricas** facilmente através de interface intuitiva
2. **Rastrear falhas** por fase do ciclo de desenvolvimento
3. **Visualizar resultados** instantaneamente com gráficos interativos  
4. **Gerar relatórios** profissionais em PDF
5. **Apresentar dados** em reviews com status visual claro
6. **Exportar informações** em JSON para integração com outros sistemas
7. **Acessar online** sem necessidade de instalação ou configuração

### 🌟 **Principais Benefícios**
- ✅ **Zero curva de aprendizado** - Interface familiar e intuitiva
- ✅ **Acesso imediato** - Funciona direto no navegador
- ✅ **Relatórios profissionais** - PDF pronto para apresentações
- ✅ **Métricas essenciais** - Foco no que realmente importa
- ✅ **Gráficos visuais** - Dados apresentados de forma impactante
- ✅ **Análise automática** - Pontos positivos e de atenção identificados
- ✅ **Rastreamento detalhado** - Falhas por fase do ciclo
- ✅ **Hospedagem gratuita** - GitHub Pages com HTTPS automático

### 🚀 **Pronto para Uso**
**Perfeito para o dia a dia do QA e apresentações de liderança!**

- **Acesse agora**: [https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html](https://bella5900g.github.io/qa-metrics-dashboard/dashboard.html)
- **Contribua**: [https://github.com/Bella5900g/qa-metrics-dashboard](https://github.com/Bella5900g/qa-metrics-dashboard)

---

## 📝 Notas Importantes

### **Classificação de Falhas**
- Classifique cada falha na fase **mais precoce** onde foi detectada
- Se uma falha foi detectada em pré-release, não conte em produção
- O objetivo é identificar onde as falhas são **primeiro detectadas**

### **Consistência de Dados**
- Use sempre o mesmo período para todas as métricas
- Mantenha registros detalhados para análise de tendências
- Adicione observações sobre eventos especiais que podem ter afetado as métricas

### **Foco em Produção**
- Priorize reduzir falhas em produção - este é o indicador mais crítico
- Quanto mais cedo as falhas forem detectadas, menor o impacto

---

**Desenvolvido com ❤️ para facilitar a vida do QA e melhorar a qualidade dos produtos!**

