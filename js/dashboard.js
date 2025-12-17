/**
 * Dashboard de Métricas QA - Nova Versão - JavaScript Principal
 * Funcionalidades para entrada de dados, cálculo de métricas e geração de relatórios
 */

class QADashboardNova {
    constructor() {
        this.metricas = {};
        this.charts = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupCharts();
        this.updateDateTime();
    }

    bindEvents() {
        // Botão calcular métricas
        document.getElementById('calcular-metricas').addEventListener('click', () => {
            this.calcularMetricas();
        });

        // Botão limpar dados
        document.getElementById('limpar-dados').addEventListener('click', () => {
            this.limparDados();
        });

        // Botões de geração de relatório
        document.getElementById('gerar-pdf').addEventListener('click', () => {
            this.gerarPDF();
        });

        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    calcularMetricas() {
        // Coletar dados do formulário - Falhas durante o ciclo de Desenvolvimento
        this.metricas = {
            // Falhas durante o ciclo de Desenvolvimento
            falhaRequisito: parseInt(document.getElementById('falha-requisito').value) || 0,
            falhaManualPreRelease: parseInt(document.getElementById('falha-manual-pre-release').value) || 0,
            falhaAutomatizadaPreRelease: parseInt(document.getElementById('falha-automatizada-pre-release').value) || 0,
            falhaManualRelease: parseInt(document.getElementById('falha-manual-release').value) || 0,
            falhaAutomatizadaRelease: parseInt(document.getElementById('falha-automatizada-release').value) || 0,
            falhaProducao: parseInt(document.getElementById('falha-producao').value) || 0,
            
            // Taxa de Escape
            taxaEscape: parseFloat(document.getElementById('taxa-escape').value) || 0,
            
            // MTTR
            mttr: parseFloat(document.getElementById('mttr').value) || 0,
            
            // Aceitação de História de Usuário
            historiasTotais: parseInt(document.getElementById('historias-totais').value) || 0,
            historiasAceitas: parseInt(document.getElementById('historias-aceitas').value) || 0,
            
            // Taxa de Automação
            taxaAutomacao: parseFloat(document.getElementById('taxa-automacao').value) || 0,
            
            // Taxa de Acerto
            taxaAcerto: parseFloat(document.getElementById('taxa-acerto').value) || 0,
            
            // Defects vs Bugs
            defectsAbertos: parseInt(document.getElementById('defeitos-abertos').value) || 0,
            defectsFechados: parseInt(document.getElementById('defeitos-fechados').value) || 0,
            bugsAbertos: parseInt(document.getElementById('bugs-abertos').value) || 0,
            bugsFechados: parseInt(document.getElementById('bugs-fechados').value) || 0,
            
            // Falhas Por Prioridade
            falhaPrioridadeTrivial: parseInt(document.getElementById('falha-prioridade-trivial').value) || 0,
            falhaPrioridadeMedia: parseInt(document.getElementById('falha-prioridade-media').value) || 0,
            falhaPrioridadeGravissima: parseInt(document.getElementById('falha-prioridade-gravissima').value) || 0,
            falhaPrioridadeCritica: parseInt(document.getElementById('falha-prioridade-critica').value) || 0,
            
            // Bugs Por Prioridade
            bugPrioridadeTrivial: parseInt(document.getElementById('bug-prioridade-trivial').value) || 0,
            bugPrioridadeMedia: parseInt(document.getElementById('bug-prioridade-media').value) || 0,
            bugPrioridadeGravissima: parseInt(document.getElementById('bug-prioridade-gravissima').value) || 0,
            bugPrioridadeCritica: parseInt(document.getElementById('bug-prioridade-critica').value) || 0,
            
            // Métricas de Testes
            testesCriados: parseInt(document.getElementById('testes-criados').value) || 0,
            testesExecutados: parseInt(document.getElementById('testes-executados').value) || 0,
            testesPassaram: parseInt(document.getElementById('testes-passaram').value) || 0,
            testesAutomatizados: parseInt(document.getElementById('testes-automatizados').value) || 0,
            
            // Informações adicionais
            equipeResponsavel: document.getElementById('equipe-responsavel').value || 'Time QA',
            periodoAnalise: document.getElementById('periodo-analise').value || 'Últimos 30 dias',
            observacoes: document.getElementById('observacoes').value || '',
            dataGeracao: new Date().toLocaleString('pt-BR')
        };

        // Calcular métricas derivadas
        this.calcularMetricasDerivadas();

        // Atualizar dashboard
        this.atualizarDashboard();

        // Mostrar dashboard
        this.mostrarDashboard();

        // Scroll para dashboard
        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    }

    calcularMetricasDerivadas() {
        // Calcular total de falhas
        this.metricas.totalFalhas = 
            this.metricas.falhaRequisito +
            this.metricas.falhaManualPreRelease +
            this.metricas.falhaAutomatizadaPreRelease +
            this.metricas.falhaManualRelease +
            this.metricas.falhaAutomatizadaRelease +
            this.metricas.falhaProducao;

        const { bugsAbertos, bugsFechados, defectsAbertos, defectsFechados } = this.metricas;
        const totalBugs = bugsAbertos + bugsFechados;
        const totalDefects = defectsAbertos + defectsFechados;

        // Taxa de correção de bugs (produção)
        this.metricas.taxaCorrecaoBugs = totalBugs > 0 ? (bugsFechados / totalBugs) * 100 : 0;

        // Taxa de correção de defects (desenvolvimento)
        this.metricas.taxaCorrecaoDefects = totalDefects > 0 ? (defectsFechados / totalDefects) * 100 : 0;

        // Aceitação de História de Usuário
        const { historiasTotais, historiasAceitas } = this.metricas;
        this.metricas.aceitacaoHistorias = historiasTotais > 0 ? (historiasAceitas / historiasTotais) * 100 : 0;
        this.metricas.statusAceitacaoHistorias = this.classificarAceitacaoHistorias(this.metricas.aceitacaoHistorias);

        // Taxa de sucesso dos testes
        const { testesExecutados, testesPassaram } = this.metricas;
        this.metricas.taxaSucessoTestes = testesExecutados > 0 ? (testesPassaram / testesExecutados) * 100 : 0;

        // Status geral baseado nas métricas
        this.metricas.statusGeral = this.calcularStatusGeral();

        // Pontos positivos e de atenção
        this.metricas.pontosPositivos = this.gerarPontosPositivos();
        this.metricas.pontosAtencao = this.gerarPontosAtencao();
    }

    calcularStatusGeral() {
        let score = 0;
        const metas = {
            taxaEscape: 5,
            mttr: 8,
            taxaAutomacao: 70,
            taxaAcerto: 85,
            taxaSucessoTestes: 90
        };

        // Taxa de Escape (menor é melhor)
        if (this.metricas.taxaEscape <= metas.taxaEscape) score += 1;

        // MTTR (menor é melhor)
        if (this.metricas.mttr <= metas.mttr) score += 1;

        // Taxa de Automação - não conta para o score (campo permanece apenas para exibição)

        // Taxa de Acerto (maior é melhor)
        if (this.metricas.taxaAcerto >= metas.taxaAcerto) score += 1;

        // Taxa de Sucesso dos Testes (maior é melhor)
        if (this.metricas.taxaSucessoTestes >= metas.taxaSucessoTestes) score += 1;

        // Falhas em produção (menor é melhor)
        if (this.metricas.falhaProducao === 0) score += 1;

        // Bugs em produção (menor é melhor)
        if ((this.metricas.bugsAbertos + this.metricas.bugsFechados) <= 3) score += 1;

        // Aceitação de História de Usuário (maior é melhor, >= 90%)
        if (this.metricas.aceitacaoHistorias >= 90) score += 1;

        if (score >= 5) return 'EXCELENTE';
        if (score >= 4) return 'BOM';
        if (score >= 2) return 'ATENCAO';
        return 'CRITICO';
    }

    classificarAceitacaoHistorias(percentual) {
        if (percentual >= 90) return 'EXCELENTE';
        if (percentual >= 80) return 'BOM';
        if (percentual >= 70) return 'ATENCAO';
        return 'CRITICO';
    }

    gerarPontosPositivos() {
        const pontos = [];
        const metas = {
            taxaEscape: 5,
            mttr: 8,
            taxaAutomacao: 70,
            taxaAcerto: 85,
            taxaSucessoTestes: 90
        };

        if (this.metricas.taxaEscape <= metas.taxaEscape) {
            pontos.push('Taxa de escape dentro da meta');
        }
        if (this.metricas.mttr <= metas.mttr) {
            pontos.push('MTTR dentro do esperado');
        }
        if (this.metricas.taxaAcerto >= metas.taxaAcerto) {
            pontos.push('Excelente taxa de acerto');
        }
        if (this.metricas.taxaSucessoTestes >= metas.taxaSucessoTestes) {
            pontos.push('Taxa de sucesso dos testes dentro da meta');
        }
        if (this.metricas.falhaProducao === 0) {
            pontos.push('Nenhuma falha em produção');
        }
        if (this.metricas.totalFalhas > 0 && this.metricas.falhaProducao === 0) {
            pontos.push('Todas as falhas identificadas antes da produção');
        }
        if (this.metricas.aceitacaoHistorias >= 90) {
            pontos.push('Excelente aceitação de histórias de usuário');
        } else if (this.metricas.aceitacaoHistorias >= 80) {
            pontos.push('Boa aceitação de histórias de usuário');
        }

        return pontos.length > 0 ? pontos : ['Métricas em análise'];
    }

    gerarPontosAtencao() {
        const pontos = [];
        const metas = {
            taxaEscape: 5,
            mttr: 8,
            taxaAutomacao: 70,
            taxaAcerto: 85,
            taxaSucessoTestes: 90
        };

        if (this.metricas.taxaEscape > metas.taxaEscape) {
            pontos.push('Taxa de escape acima da meta');
        }
        if (this.metricas.mttr > metas.mttr) {
            pontos.push('MTTR acima do esperado');
        }
        if (this.metricas.taxaAcerto < metas.taxaAcerto) {
            pontos.push('Taxa de acerto abaixo da meta');
        }
        if (this.metricas.taxaSucessoTestes < metas.taxaSucessoTestes) {
            pontos.push('Taxa de sucesso dos testes abaixo da meta');
        }
        if (this.metricas.falhaProducao > 0) {
            pontos.push(`Falhas em produção detectadas: ${this.metricas.falhaProducao}`);
        }
        if (this.metricas.falhaRequisito > 0) {
            pontos.push(`Falhas de requisito detectadas: ${this.metricas.falhaRequisito}`);
        }
        if (this.metricas.bugsAbertos > 0) {
            pontos.push(`Bugs abertos em produção: ${this.metricas.bugsAbertos}`);
        }
        if (this.metricas.aceitacaoHistorias < 90) {
            if (this.metricas.aceitacaoHistorias < 70) {
                pontos.push(`Aceitação de histórias crítica: ${this.metricas.aceitacaoHistorias.toFixed(1)}%`);
            } else if (this.metricas.aceitacaoHistorias < 80) {
                pontos.push(`Aceitação de histórias requer atenção: ${this.metricas.aceitacaoHistorias.toFixed(1)}%`);
            } else {
                pontos.push(`Aceitação de histórias abaixo do excelente: ${this.metricas.aceitacaoHistorias.toFixed(1)}%`);
            }
        }

        return pontos.length > 0 ? pontos : ['Todas as métricas dentro das metas'];
    }

    atualizarDashboard() {
        // Falhas durante o ciclo de Desenvolvimento
        document.getElementById('falha-requisito-valor').textContent = this.metricas.falhaRequisito;
        document.getElementById('falha-manual-pre-release-valor').textContent = this.metricas.falhaManualPreRelease;
        document.getElementById('falha-automatizada-pre-release-valor').textContent = this.metricas.falhaAutomatizadaPreRelease;
        document.getElementById('falha-manual-release-valor').textContent = this.metricas.falhaManualRelease;
        document.getElementById('falha-automatizada-release-valor').textContent = this.metricas.falhaAutomatizadaRelease;
        document.getElementById('falha-producao-valor').textContent = this.metricas.falhaProducao;

        // Atualizar avisos e parabéns para falhas
        this.atualizarAvisosFalhas();

        // Taxa de Escape
        document.getElementById('taxa-escape-valor').textContent = `${this.metricas.taxaEscape}%`;
        
        // MTTR
        document.getElementById('mttr-valor').textContent = `${this.metricas.mttr}h`;
        
        // Aceitação de História de Usuário
        const aceitacaoHistorias = this.metricas.aceitacaoHistorias || 0;
        document.getElementById('aceitacao-historias-valor').textContent = `${aceitacaoHistorias.toFixed(1)}%`;
        const statusAceitacao = this.metricas.statusAceitacaoHistorias || 'BOM';
        const statusElementAceitacao = document.getElementById('aceitacao-historias-status');
        if (statusElementAceitacao) {
            statusElementAceitacao.innerHTML = `<span class="badge badge-status ${this.getStatusClass(statusAceitacao)}">${statusAceitacao}</span>`;
        }
        // Atualizar classe do valor baseado no status
        const valorElementAceitacao = document.getElementById('aceitacao-historias-valor');
        valorElementAceitacao.className = `metric-value ${this.getStatusClassMetric(statusAceitacao)}`;
        
        // Taxa de Automação
        document.getElementById('automacao-valor').textContent = `${this.metricas.taxaAutomacao}%`;
        
        // Taxa de Acerto
        document.getElementById('acerto-valor').textContent = `${this.metricas.taxaAcerto}%`;

        // Defects vs Bugs
        document.getElementById('defects-fechados-valor').textContent = this.metricas.defectsFechados;
        document.getElementById('defects-abertos-valor').textContent = this.metricas.defectsAbertos;
        document.getElementById('bugs-fechados-valor').textContent = this.metricas.bugsFechados;
        document.getElementById('bugs-abertos-valor').textContent = this.metricas.bugsAbertos;

        // Falhas Por Prioridade
        document.getElementById('falha-prioridade-trivial-valor').textContent = this.metricas.falhaPrioridadeTrivial;
        document.getElementById('falha-prioridade-media-valor').textContent = this.metricas.falhaPrioridadeMedia;
        document.getElementById('falha-prioridade-gravissima-valor').textContent = this.metricas.falhaPrioridadeGravissima;
        document.getElementById('falha-prioridade-critica-valor').textContent = this.metricas.falhaPrioridadeCritica;

        // Bugs Por Prioridade
        document.getElementById('bug-prioridade-trivial-valor').textContent = this.metricas.bugPrioridadeTrivial;
        document.getElementById('bug-prioridade-media-valor').textContent = this.metricas.bugPrioridadeMedia;
        document.getElementById('bug-prioridade-gravissima-valor').textContent = this.metricas.bugPrioridadeGravissima;
        document.getElementById('bug-prioridade-critica-valor').textContent = this.metricas.bugPrioridadeCritica;

        // Métricas de Testes
        document.getElementById('testes-criados-valor').textContent = this.metricas.testesCriados;
        document.getElementById('testes-executados-valor').textContent = this.metricas.testesExecutados;
        document.getElementById('testes-passaram-valor').textContent = this.metricas.testesPassaram;
        document.getElementById('testes-automatizados-valor').textContent = this.metricas.testesAutomatizados;
        document.getElementById('taxa-sucesso-testes-valor').textContent = `${this.metricas.taxaSucessoTestes.toFixed(1)}%`;

        // Atualizar status geral
        const statusElement = document.getElementById('status-geral');
        statusElement.textContent = this.metricas.statusGeral;
        statusElement.className = `badge badge-status ${this.getStatusClass(this.metricas.statusGeral)}`;

        // Atualizar data de geração
        document.getElementById('data-geracao').textContent = this.metricas.dataGeracao;

        // Atualizar progress bars
        this.atualizarProgressBars();

        // Atualizar pontos positivos e de atenção
        this.atualizarPontos();

        // Atualizar gráficos
        this.atualizarGraficos();
    }

    getStatusClass(status) {
        switch (status) {
            case 'EXCELENTE': return 'bg-success';
            case 'BOM': return 'bg-primary';
            case 'ATENCAO': return 'bg-warning';
            case 'CRITICO': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    atualizarProgressBars() {
        // Taxa de Escape (invertido - menor é melhor)
        const taxaEscapeProgress = (100 - this.metricas.taxaEscape) / 100 * 100;
        document.getElementById('taxa-escape-progress').style.width = `${Math.min(taxaEscapeProgress, 100)}%`;

        // MTTR (invertido - menor é melhor)
        const mttrProgress = (8 - this.metricas.mttr) / 8 * 100;
        document.getElementById('mttr-progress').style.width = `${Math.max(mttrProgress, 0)}%`;

        // Taxa de Automação
        document.getElementById('automacao-progress').style.width = `${this.metricas.taxaAutomacao}%`;

        // Taxa de Acerto
        document.getElementById('acerto-progress').style.width = `${this.metricas.taxaAcerto}%`;

        // Aceitação de História de Usuário
        const aceitacaoHistorias = this.metricas.aceitacaoHistorias || 0;
        const progressBarAceitacao = document.getElementById('aceitacao-historias-progress');
        progressBarAceitacao.style.width = `${Math.min(aceitacaoHistorias, 100)}%`;
        
        // Atualizar cor baseada no status
        const statusAceitacao = this.metricas.statusAceitacaoHistorias || 'BOM';
        progressBarAceitacao.className = 'progress-bar';
        if (statusAceitacao === 'EXCELENTE') {
            progressBarAceitacao.classList.add('bg-success');
        } else if (statusAceitacao === 'BOM') {
            progressBarAceitacao.classList.add('bg-primary');
        } else if (statusAceitacao === 'ATENCAO') {
            progressBarAceitacao.classList.add('bg-warning');
        } else {
            progressBarAceitacao.classList.add('bg-danger');
        }
    }

    getStatusClassMetric(status) {
        switch (status) {
            case 'EXCELENTE': return 'status-excelente';
            case 'BOM': return 'status-bom';
            case 'ATENCAO': return 'status-atencao';
            case 'CRITICO': return 'status-critico';
            default: return 'status-bom';
        }
    }

    atualizarPontos() {
        const pontosPositivos = document.getElementById('pontos-positivos');
        const pontosAtencao = document.getElementById('pontos-atencao');

        pontosPositivos.innerHTML = this.metricas.pontosPositivos.map(ponto => 
            `<li><i class="bi bi-check-circle text-success"></i> ${ponto}</li>`
        ).join('');

        pontosAtencao.innerHTML = this.metricas.pontosAtencao.map(ponto => 
            `<li><i class="bi bi-exclamation-triangle text-warning"></i> ${ponto}</li>`
        ).join('');
    }

    atualizarAvisosFalhas() {
        const avisosContainer = document.getElementById('avisos-falhas');
        if (!avisosContainer) return;

        avisosContainer.innerHTML = '';

        const {
            falhaRequisito,
            falhaManualPreRelease,
            falhaAutomatizadaPreRelease,
            falhaManualRelease,
            falhaAutomatizadaRelease,
            falhaProducao
        } = this.metricas;

        // Definir limite para considerar "números altos"
        const limiteAlto = 2; // Se tiver 2 ou mais, é considerado alto

        // Avisos de atenção para falhas em fases tardias
        const avisos = [];
        if (falhaManualRelease >= limiteAlto) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `⚠️ Atenção: ${falhaManualRelease} falha(s) manual(is) detectada(s) durante os testes da Release. É importante verificar o porque essas falhas não foram detectadas na fase de Pré-Release.`
            });
        }
        if (falhaAutomatizadaRelease >= limiteAlto) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `⚠️ Atenção: ${falhaAutomatizadaRelease} falha(s) automatizada(s) detectada(s) durante os testes da Release. É importante verificar o porque essas falhas não foram detectadas na fase de Pré-Release.`
            });
        }
        if (falhaProducao >= limiteAlto) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `🚨 Atenção Crítica: ${falhaProducao} falha(s) detectada(s) em Produção. Ação imediata necessária! É importante verificar o porque essas falhas não foram detectadas na fase de Pré-Release e Release.`
            });
        } else if (falhaProducao > 0) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `⚠️ Atenção: ${falhaProducao} falha(s) detectada(s) em Produção. Revise todo o processo para verificar onde essas falhas poderiam ser evitadas.`
            });
        }

        // Parabéns para falhas detectadas cedo
        const parabens = [];
        if (falhaRequisito >= limiteAlto) {
            parabens.push({
                tipo: 'sucesso',
                mensagem: `✅ Parabéns! ${falhaRequisito} falha(s) de requisito detectada(s) cedo. O time está identificando inconsistências antes do desenvolvimento!`
            });
        }
        if (falhaManualPreRelease >= limiteAlto) {
            parabens.push({
                tipo: 'sucesso',
                mensagem: `✅ Parabéns! ${falhaManualPreRelease} falha(s) manual(is) detectada(s) em Pré-Release. Os testes manuais estão funcionando bem!`
            });
        }
        if (falhaAutomatizadaPreRelease >= limiteAlto) {
            parabens.push({
                tipo: 'sucesso',
                mensagem: `✅ Parabéns! ${falhaAutomatizadaPreRelease} falha(s) automatizada(s) detectada(s) em Pré-Release. A automação está capturando problemas cedo!`
            });
        }

        // Exibir parabéns primeiro (positivo)
        parabens.forEach(item => {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${item.tipo === 'sucesso' ? 'success' : 'warning'} alert-dismissible fade show`;
            alertDiv.innerHTML = `
                ${item.mensagem}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            avisosContainer.appendChild(alertDiv);
        });

        // Exibir avisos depois (atenção)
        avisos.forEach(item => {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${item.tipo === 'atencao' ? 'warning' : 'danger'} alert-dismissible fade show`;
            alertDiv.innerHTML = `
                ${item.mensagem}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            avisosContainer.appendChild(alertDiv);
        });
    }

    setupCharts() {
        // Gráfico de Falhas durante o ciclo de Desenvolvimento
        const ctxFalhas = document.getElementById('falhasChart');
        if (ctxFalhas) {
            this.charts.falhas = new Chart(ctxFalhas, {
                type: 'bar',
                data: {
                    labels: [
                        'Falha de Requisito',
                        'Falha Manual Pré-Release',
                        'Falha Automatizada Pré-Release',
                        'Falha Manual Release',
                        'Falha Automatizada Release',
                        'Falha em Produção'
                    ],
                    datasets: [{
                        label: 'Quantidade de Falhas',
                        data: [0, 0, 0, 0, 0, 0],
                        backgroundColor: [
                            '#e74c3c',
                            '#f39c12',
                            '#f39c12',
                            '#3498db',
                            '#3498db',
                            '#c0392b'
                        ],
                        borderColor: [
                            '#c0392b',
                            '#e67e22',
                            '#e67e22',
                            '#2980b9',
                            '#2980b9',
                            '#a93226'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Falhas durante o Ciclo de Desenvolvimento'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }

        // Gráfico de Defects vs Bugs
        const ctxDefectsBugs = document.getElementById('defectsBugsChart');
        if (ctxDefectsBugs) {
            this.charts.defectsBugs = new Chart(ctxDefectsBugs, {
                type: 'doughnut',
                data: {
                    labels: ['Defeitos (Dev)', 'Bugs (Prod)'],
                    datasets: [{
                        data: [23, 5],
                        backgroundColor: ['#f39c12', '#e74c3c'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Gráfico de Comparação com Metas
        const ctxMetas = document.getElementById('metasChart');
        if (ctxMetas) {
            this.charts.metas = new Chart(ctxMetas, {
                type: 'bar',
                data: {
                    labels: ['Taxa Escape', 'MTTR', 'Acerto', 'Aceitação de Histórias', 'Sucesso Testes'],
                    datasets: [{
                        label: 'Atual',
                        data: [3.2, 6.2, 85.7, 90, 90.5],
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    }, {
                        label: 'Meta',
                        data: [5, 8, 85, 90, 90],
                        backgroundColor: '#95a5a6',
                        borderColor: '#7f8c8d',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    }
                }
            });
        }

        // Plugin customizado para mostrar total no centro - Falhas
        const centerTextPluginFalhas = {
            id: 'centerTextFalhas',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                
                const data = chart.data.datasets[0].data;
                const total = data.reduce((a, b) => a + b, 0);
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#2c3e50';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Total', centerX, centerY - 10);
                
                ctx.font = 'bold 32px Arial';
                ctx.fillStyle = '#3498db';
                ctx.fillText(total.toString(), centerX, centerY + 20);
                ctx.restore();
            }
        };

        // Gráfico de Falhas Por Prioridade
        const ctxFalhasPrioridade = document.getElementById('falhasPrioridadeChart');
        if (ctxFalhasPrioridade) {
            this.charts.falhasPrioridade = new Chart(ctxFalhasPrioridade, {
                type: 'doughnut',
                data: {
                    labels: ['Trivial', 'Média', 'Gravíssima', 'Crítica'],
                    datasets: [{
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            '#95a5a6',  // Trivial - Cinza
                            '#3498db',  // Média - Azul
                            '#f39c12',  // Gravíssima - Laranja
                            '#e74c3c'   // Crítica - Vermelho
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Falhas por Prioridade'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                                }
                            }
                        }
                    }
                },
                plugins: [centerTextPluginFalhas]
            });
        }

        // Plugin customizado para mostrar total no centro - Bugs
        const centerTextPluginBugs = {
            id: 'centerTextBugs',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                
                const data = chart.data.datasets[0].data;
                const total = data.reduce((a, b) => a + b, 0);
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#2c3e50';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Total', centerX, centerY - 10);
                
                ctx.font = 'bold 32px Arial';
                ctx.fillStyle = '#e74c3c';
                ctx.fillText(total.toString(), centerX, centerY + 20);
                ctx.restore();
            }
        };

        // Gráfico de Bugs Por Prioridade
        const ctxBugsPrioridade = document.getElementById('bugsPrioridadeChart');
        if (ctxBugsPrioridade) {
            this.charts.bugsPrioridade = new Chart(ctxBugsPrioridade, {
                type: 'doughnut',
                data: {
                    labels: ['Trivial', 'Média', 'Gravíssima', 'Crítica'],
                    datasets: [{
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            '#95a5a6',  // Trivial - Cinza
                            '#3498db',  // Média - Azul
                            '#f39c12',  // Gravíssima - Laranja
                            '#e74c3c'   // Crítica - Vermelho
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Bugs por Prioridade'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                                }
                            }
                        }
                    }
                },
                plugins: [centerTextPluginBugs]
            });
        }

        // Gráfico de Status dos Testes
        const ctxTestes = document.getElementById('testesChart');
        if (ctxTestes) {
            this.charts.testes = new Chart(ctxTestes, {
                type: 'doughnut',
                data: {
                    labels: ['Passaram', 'Falharam'],
                    datasets: [{
                        data: [0, 0],
                        backgroundColor: ['#27ae60', '#e74c3c'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    atualizarGraficos() {
        // Atualizar gráfico de Falhas
        if (this.charts.falhas) {
            this.charts.falhas.data.datasets[0].data = [
                this.metricas.falhaRequisito,
                this.metricas.falhaManualPreRelease,
                this.metricas.falhaAutomatizadaPreRelease,
                this.metricas.falhaManualRelease,
                this.metricas.falhaAutomatizadaRelease,
                this.metricas.falhaProducao
            ];
            this.charts.falhas.update();
        }

        // Atualizar gráfico Defects vs Bugs
        if (this.charts.defectsBugs) {
            const totalDefects = this.metricas.defectsAbertos + this.metricas.defectsFechados;
            const totalBugs = this.metricas.bugsAbertos + this.metricas.bugsFechados;
            this.charts.defectsBugs.data.datasets[0].data = [totalDefects, totalBugs];
            this.charts.defectsBugs.update();
        }

        // Atualizar dados dos gráficos com as métricas calculadas
        if (this.charts.metas) {
            const aceitacaoHistorias = this.metricas.aceitacaoHistorias || 0;
            const taxaSucessoTestes = this.metricas.taxaSucessoTestes || 0;
            this.charts.metas.data.datasets[0].data = [
                this.metricas.taxaEscape,
                this.metricas.mttr,
                this.metricas.taxaAcerto,
                aceitacaoHistorias,
                taxaSucessoTestes
            ];
            // Atualizar também as metas (incluindo a meta de aceitação que é 90%)
            this.charts.metas.data.datasets[1].data = [
                5,  // Taxa Escape meta
                8,  // MTTR meta
                85, // Acerto meta
                90, // Aceitação meta
                90  // Sucesso Testes meta
            ];
            this.charts.metas.update();
        }

        // Atualizar gráfico de Falhas Por Prioridade
        if (this.charts.falhasPrioridade) {
            this.charts.falhasPrioridade.data.datasets[0].data = [
                this.metricas.falhaPrioridadeTrivial,
                this.metricas.falhaPrioridadeMedia,
                this.metricas.falhaPrioridadeGravissima,
                this.metricas.falhaPrioridadeCritica
            ];
            this.charts.falhasPrioridade.update();
        }

        // Atualizar gráfico de Bugs Por Prioridade
        if (this.charts.bugsPrioridade) {
            this.charts.bugsPrioridade.data.datasets[0].data = [
                this.metricas.bugPrioridadeTrivial,
                this.metricas.bugPrioridadeMedia,
                this.metricas.bugPrioridadeGravissima,
                this.metricas.bugPrioridadeCritica
            ];
            this.charts.bugsPrioridade.update();
        }

        // Atualizar gráfico de testes
        if (this.charts.testes) {
            const testesFalharam = this.metricas.testesExecutados - this.metricas.testesPassaram;
            this.charts.testes.data.datasets[0].data = [this.metricas.testesPassaram, testesFalharam];
            this.charts.testes.update();
        }
    }

    mostrarDashboard() {
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('relatorio').classList.remove('hidden');
    }

    limparDados() {
        // Limpar formulário
        document.querySelectorAll('#entrada-dados input').forEach(input => {
            input.value = '';
        });

        // Esconder dashboard
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('relatorio').classList.add('hidden');

        // Resetar métricas
        this.metricas = {};
    }

    async gerarPDF() {
        try {
            // Verificar bibliotecas
            if (typeof window.jspdf === 'undefined') {
                alert('❌ Erro: Biblioteca jsPDF não carregada.');
                return;
            }
            
            if (typeof html2canvas === 'undefined') {
                alert('❌ Erro: Biblioteca html2canvas não carregada.');
                return;
            }

            // Verificar se o dashboard está visível
            const dashboardElement = document.getElementById('dashboard');
            if (!dashboardElement || dashboardElement.classList.contains('hidden')) {
                alert('⚠️ Por favor, calcule as métricas primeiro antes de gerar o PDF.');
                return;
            }

            // Mostrar loading
            const btnPdf = document.getElementById('gerar-pdf');
            const originalText = btnPdf.innerHTML;
            btnPdf.innerHTML = '<i class="bi bi-hourglass-split"></i> Gerando PDF...';
            btnPdf.disabled = true;

            // Atualizar valores dos campos de relatório antes de gerar o PDF
            this.metricas.equipeResponsavel = document.getElementById('equipe-responsavel').value || 'Time QA';
            this.metricas.periodoAnalise = document.getElementById('periodo-analise').value || 'Últimos 30 dias';
            this.metricas.observacoes = document.getElementById('observacoes').value || '';
            this.metricas.dataGeracao = new Date().toLocaleString('pt-BR');

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Configurações do documento
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            // Adicionar cabeçalho com informações do relatório
            doc.setFillColor(52, 144, 219); // Azul
            doc.rect(0, 0, pageWidth, 35, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('ARGO - Métricas QA', 20, 20);
            
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(`Relatório: ${this.metricas.equipeResponsavel} | ${this.metricas.periodoAnalise} | ${this.metricas.dataGeracao}`, 20, 30);
            
            // Capturar tópicos agrupados conforme solicitado
            try {
                const dashboardElement = document.getElementById('dashboard');
                const margin = 15;
                const availableWidth = pageWidth - (margin * 2);
                let pageNumber = 1;
                const footerHeight = 20;
                
                // Função auxiliar para coletar elementos de um tópico
                const collectTopicElements = (topicTitleText) => {
                    let topicTitleRow = null;
                    let allContent = [];
                    
                    if (topicTitleText === 'Resumo de Análise') {
                        // Para o resumo, buscar pela card com o título
                        // Buscar todas as rows (filhos diretos do dashboard)
                        const allRows = Array.from(dashboardElement.children).filter(child => 
                            child.nodeType === 1 && child.classList && child.classList.contains('row')
                        );
                        for (let row of allRows) {
                            const cardTitle = row.querySelector('h5.card-title');
                            if (cardTitle && cardTitle.textContent.trim() === 'Resumo de Análise') {
                                topicTitleRow = row;
                                allContent = [row];
                                break;
                            }
                        }
                    } else {
                        // Para os outros tópicos, buscar por h4.text-primary
                        // Buscar todas as rows (filhos diretos do dashboard)
                        const allRows = Array.from(dashboardElement.children).filter(child => 
                            child.nodeType === 1 && child.classList && child.classList.contains('row')
                        );
                        
                        for (let i = 0; i < allRows.length; i++) {
                            const h4 = allRows[i].querySelector('h4.text-primary');
                            if (h4 && h4.textContent.includes(topicTitleText)) {
                                topicTitleRow = allRows[i];
                                
                                // Coletar todo o conteúdo do tópico até o próximo título
                                allContent = [topicTitleRow]; // Incluir o título
                                
                                // Continuar coletando as próximas rows até encontrar o próximo tópico
                                for (let j = i + 1; j < allRows.length; j++) {
                                    const nextRow = allRows[j];
                                    
                                    // Verificar se é o próximo tópico (tem h4.text-primary)
                                    const nextTitle = nextRow.querySelector('h4.text-primary');
                                    if (nextTitle) break; // Encontrou próximo tópico, parar
                                    
                                    // Verificar se é o Resumo de Análise (tem h5.card-title com "Resumo de Análise")
                                    const cardTitle = nextRow.querySelector('h5.card-title');
                                    if (cardTitle && cardTitle.textContent.includes('Resumo de Análise')) {
                                        break; // Encontrou Resumo de Análise, parar para não incluí-lo
                                    }
                                    
                                    // Adicionar esta row ao conteúdo (mesmo que não tenha mb-4)
                                    allContent.push(nextRow);
                                }
                                break;
                            }
                        }
                    }
                    
                    return allContent;
                };
                
                // Calcular total de páginas dinamicamente (após definir collectTopicElements)
                let totalPages = 3; // Base: Falhas, Métricas Críticas, Métricas Eficiência + Comparação
                // Verificar se há Resumo de Análise
                const resumoCheck = collectTopicElements('Resumo de Análise');
                if (resumoCheck && resumoCheck.length > 0) {
                    totalPages++; // Adicionar página do Resumo de Análise
                }
                // Verificar se há observações
                if (this.metricas.observacoes && this.metricas.observacoes.trim()) {
                    totalPages++; // Adicionar página de Observações
                }
                
                // Função auxiliar para adicionar elementos em uma página
                const addElementsToPage = async (elements) => {
                    if (!elements || elements.length === 0) {
                        console.warn('Nenhum elemento para adicionar à página');
                        return false;
                    }
                    
                    // Criar nova página (exceto para a primeira)
                    if (pageNumber > 1) {
            doc.addPage();
                    }
                    
                    // Adicionar cabeçalho do relatório na primeira página
                    if (pageNumber === 1) {
                        doc.setFillColor(52, 144, 219);
                        doc.rect(0, 0, pageWidth, 35, 'F');
                        doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
                        doc.text('ARGO - Métricas QA', 20, 20);
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.text(`Relatório: ${this.metricas.equipeResponsavel} | ${this.metricas.periodoAnalise} | ${this.metricas.dataGeracao}`, 20, 30);
                    }
                    
                    // Ocultar todos os elementos do dashboard exceto os que queremos
                    // Buscar todos os filhos diretos do dashboard que são rows
                    const allRows = Array.from(dashboardElement.children).filter(child => 
                        child.nodeType === 1 && child.classList && child.classList.contains('row')
                    );
                    const hiddenElements = [];
                    
                    // Criar conjunto de elementos a mostrar (incluindo os elementos e suas rows pai)
                    const elementsToShow = new Set();
                    elements.forEach(el => {
                        elementsToShow.add(el);
                        // Se o elemento não é uma row, encontrar sua row pai
                        if (!el.classList || !el.classList.contains('row')) {
                            let parent = el.parentElement;
                            while (parent && parent !== dashboardElement) {
                                if (parent.classList && parent.classList.contains('row')) {
                                    elementsToShow.add(parent);
                                    break;
                                }
                                parent = parent.parentElement;
                            }
                        }
                    });
                    
                    allRows.forEach(row => {
                        let shouldShow = false;
                        
                        // Verificar se esta row está na lista de elementos a mostrar
                        if (elementsToShow.has(row)) {
                            shouldShow = true;
                        } else {
                            // Verificar se algum elemento da lista está dentro desta row
                            for (let targetElement of elements) {
                                if (row.contains(targetElement)) {
                                    shouldShow = true;
                                    break;
                                }
                            }
                        }
                        
                        if (!shouldShow) {
                            const originalDisplay = row.style.display;
                            row.style.display = 'none';
                            hiddenElements.push({ element: row, display: originalDisplay });
                        }
                    });
                    
                    // Aguardar para garantir que a ocultação seja aplicada e gráficos renderizados
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Forçar atualização dos gráficos antes de capturar
                    try {
                        if (this.charts.falhasPrioridade) {
                            this.charts.falhasPrioridade.update('none');
                        }
                        if (this.charts.bugsPrioridade) {
                            this.charts.bugsPrioridade.update('none');
                        }
                        // Aguardar renderização
                        await new Promise(resolve => setTimeout(resolve, 300));
                    } catch (e) {
                        console.warn('Erro ao atualizar gráficos:', e);
                    }
                    
                    // Verificar se há elementos visíveis antes de capturar
                    const visibleRows = allRows.filter(row => {
                        const style = window.getComputedStyle(row);
                        return style.display !== 'none' && style.visibility !== 'hidden';
                    });
                    
                    if (visibleRows.length === 0) {
                        console.error('Nenhum elemento visível para capturar');
                        // Restaurar visibilidade antes de lançar erro
                        hiddenElements.forEach(({ element, display }) => {
                            element.style.display = display || '';
                        });
                        throw new Error('Nenhum conteúdo visível encontrado para capturar');
                    }
                    
                    // Verificar se o dashboard tem altura mínima
                    const dashboardHeight = dashboardElement.offsetHeight || dashboardElement.scrollHeight;
                    if (dashboardHeight < 50) {
                        console.warn('Dashboard muito pequeno, pode estar vazio');
                    }
                    
                    // Capturar o dashboard (apenas elementos visíveis serão capturados)
                    let canvas;
                    try {
                        canvas = await html2canvas(dashboardElement, {
                            backgroundColor: '#ffffff',
                            scale: 1.2,
                            useCORS: true,
                            logging: false,
                            allowTaint: true,
                            timeout: 30000,
                            imageTimeout: 15000,
                            width: dashboardElement.scrollWidth || dashboardElement.offsetWidth,
                            height: dashboardElement.scrollHeight || dashboardElement.offsetHeight
                        });
                        
                        if (!canvas || canvas.width === 0 || canvas.height === 0) {
                            throw new Error('Canvas capturado está vazio');
                        }
                    } catch (canvasError) {
                        console.error('Erro ao capturar canvas:', canvasError);
                        // Restaurar visibilidade antes de lançar erro
                        hiddenElements.forEach(({ element, display }) => {
                            element.style.display = display || '';
                        });
                        throw new Error('Falha ao capturar a imagem do dashboard: ' + (canvasError.message || 'Erro desconhecido'));
                    }
                    
                    // Restaurar visibilidade de todos os elementos
                    hiddenElements.forEach(({ element, display }) => {
                        element.style.display = display || '';
                    });
                    
                    // Validar se o canvas tem conteúdo
                    if (!canvas || canvas.width === 0 || canvas.height === 0) {
                        console.error('Canvas vazio ou inválido');
                        throw new Error('Canvas não pôde ser capturado corretamente');
                    }
                    
                    const imgData = canvas.toDataURL('image/png', 1.0);
                    
                    // Validar se a imagem foi gerada
                    if (!imgData || imgData === 'data:,') {
                        console.error('Imagem não foi gerada do canvas');
                        throw new Error('Falha ao gerar imagem do canvas');
                    }
                    
                    const imgWidth = availableWidth;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    // Validar dimensões
                    if (imgHeight <= 0 || imgWidth <= 0) {
                        console.error('Dimensões inválidas da imagem:', { imgWidth, imgHeight, canvasWidth: canvas.width, canvasHeight: canvas.height });
                        throw new Error('Dimensões inválidas da imagem capturada');
                    }
                    
                    // Calcular posição Y inicial
                    let startY = pageNumber === 1 ? 45 : 10;
                    const availableHeight = pageHeight - startY - footerHeight;
                    
                    // Ajustar altura se necessário
                    let finalHeight = imgHeight;
                    if (imgHeight > availableHeight) {
                        finalHeight = availableHeight;
                    }
                    
                    // Adicionar imagem na página
                    try {
                        doc.addImage(imgData, 'PNG', margin, startY, imgWidth, finalHeight);
                    } catch (addImageError) {
                        console.error('Erro ao adicionar imagem ao PDF:', addImageError);
                        throw new Error('Falha ao adicionar imagem ao PDF: ' + addImageError.message);
                    }
                    
                    // Adicionar rodapé
                    doc.setFontSize(8);
                    doc.setTextColor(128, 128, 128);
                    doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth - 40, pageHeight - 10);
                    
                    pageNumber++;
                    return true;
                };
                
                // Página 1: Falhas durante o Ciclo de Desenvolvimento (sozinho)
                const falhasElements = collectTopicElements('Falhas durante o Ciclo de Desenvolvimento');
                await addElementsToPage(falhasElements);
                
                // Página 2: Métricas Críticas (inclui Falhas Por Prioridade e Bugs Por Prioridade)
                const metricasCriticasElements = collectTopicElements('Métricas Críticas');
                await addElementsToPage(metricasCriticasElements);
                
                // Página 3: Métricas de Eficiência + Métricas de Testes + Comparação Métricas VS Metas (juntos)
                const metricasEficienciaElements = collectTopicElements('Métricas de Eficiência');
                const metricasTestesElements = collectTopicElements('Métricas de Testes');
                const comparacaoElements = collectTopicElements('Comparação Métricas VS Metas');
                const combinedElements2 = [...metricasEficienciaElements, ...metricasTestesElements, ...comparacaoElements];
                await addElementsToPage(combinedElements2);
                
                // Página 4: Resumo de Análise (página exclusiva)
                const resumoElements = collectTopicElements('Resumo de Análise');
                // Garantir que não está vazio e adicionar em página exclusiva
                if (resumoElements && resumoElements.length > 0) {
                    await addElementsToPage(resumoElements);
                }
                
                // Adicionar observações se houver, em nova página
                if (this.metricas.observacoes && this.metricas.observacoes.trim()) {
            doc.addPage();
                    pageNumber++;
                    
                    // Cabeçalho
                    doc.setFillColor(52, 144, 219);
                    doc.rect(0, 0, pageWidth, 30, 'F');
                    doc.setTextColor(255, 255, 255);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                    doc.text('Observações Adicionais', 20, 20);
                    
                    // Conteúdo
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                const splitObservacoes = doc.splitTextToSize(this.metricas.observacoes, pageWidth - 40);
                    doc.text(splitObservacoes, 20, 45);

            // Rodapé
                    doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
                    doc.text(`Página ${pageNumber}`, pageWidth - 40, pageHeight - 10);
                }
                
            } catch (error) {
                console.error('Erro ao capturar dashboard:', error);
                // Fallback: adicionar página com mensagem de erro
                try {
                    if (pageNumber === 1) {
                        doc.setFillColor(52, 144, 219);
                        doc.rect(0, 0, pageWidth, 35, 'F');
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(18);
                        doc.setFont('helvetica', 'bold');
                        doc.text('ARGO - Métricas QA', 20, 20);
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.text(`Relatório: ${this.metricas.equipeResponsavel} | ${this.metricas.periodoAnalise} | ${this.metricas.dataGeracao}`, 20, 30);
                    } else {
                        doc.addPage();
                    }
                    doc.setFontSize(12);
                    doc.setTextColor(231, 76, 60);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Erro ao capturar dashboard', 20, 50);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(0, 0, 0);
                    doc.text('Ocorreu um erro ao gerar o PDF. Detalhes:', 20, 70);
                    const errorText = doc.splitTextToSize(error.message || 'Erro desconhecido', pageWidth - 40);
                    doc.text(errorText, 20, 85);
                    doc.text('Por favor, tente novamente ou entre em contato com o suporte.', 20, 120);
                } catch (fallbackError) {
                    console.error('Erro no fallback:', fallbackError);
                }
            }

            // Gerar nome do arquivo com horário local
            const agora = new Date();
            const ano = agora.getFullYear();
            const mes = String(agora.getMonth() + 1).padStart(2, '0');
            const dia = String(agora.getDate()).padStart(2, '0');
            const horas = String(agora.getHours()).padStart(2, '0');
            const minutos = String(agora.getMinutes()).padStart(2, '0');
            const segundos = String(agora.getSeconds()).padStart(2, '0');
            const dataHora = `${ano}-${mes}-${dia}_${horas}-${minutos}-${segundos}`;
            const nomeArquivo = `${this.metricas.equipeResponsavel}-${dataHora}.pdf`;

            // Download do PDF
            doc.save(nomeArquivo);
            
            // Restaurar botão
            btnPdf.innerHTML = originalText;
            btnPdf.disabled = false;
            
            alert('✅ PDF gerado com sucesso!');
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('❌ Erro ao gerar PDF: ' + error.message);
            
            // Restaurar botão em caso de erro
            const btnPdf = document.getElementById('gerar-pdf');
            btnPdf.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> Gerar PDF';
            btnPdf.disabled = false;
        }
    }

    async captureChartAsImage(canvas) {
        return new Promise((resolve) => {
            html2canvas(canvas, {
                backgroundColor: '#ffffff',
                scale: 3, // Aumentado para melhor qualidade
                useCORS: true,
                logging: false,
                width: canvas.width,
                height: canvas.height
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png', 1.0);
                resolve(imgData);
            }).catch((error) => {
                console.log('Erro ao capturar gráfico:', error);
                // Fallback: criar imagem simples
                const fallbackCanvas = document.createElement('canvas');
                fallbackCanvas.width = 400;
                fallbackCanvas.height = 300;
                const ctx = fallbackCanvas.getContext('2d');
                ctx.fillStyle = '#f8f9fa';
                ctx.fillRect(0, 0, 400, 300);
                ctx.fillStyle = '#6c757d';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Gráfico não disponível', 200, 150);
                resolve(fallbackCanvas.toDataURL('image/png'));
            });
        });
    }

    drawMetricCardPDF(doc, x, y, title, value, meta, color) {
        // Card background
        doc.setFillColor(248, 249, 250);
        doc.roundedRect(x, y, 80, 38, 3, 3, 'F');
        
        // Border com cor sutil
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, y, 80, 38, 3, 3);
        
        // Title
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        // Quebrar título longo em duas linhas se necessário
        const titleLines = doc.splitTextToSize(title, 70);
        doc.text(titleLines, x + 5, y + 8);
        
        // Value
        doc.setFontSize(20);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFont('helvetica', 'bold');
        const titleHeight = titleLines.length * 4;
        doc.text(value, x + 5, y + 18 + titleHeight);
        
        // Meta
        if (meta) {
            doc.setFontSize(7);
            doc.setTextColor(108, 117, 125);
            doc.setFont('helvetica', 'normal');
            doc.text(meta, x + 5, y + 32);
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'EXCELENTE': return [39, 174, 96]; // Verde
            case 'BOM': return [52, 144, 219]; // Azul
            case 'ATENCAO': return [243, 156, 18]; // Amarelo
            case 'CRITICO': return [231, 76, 60]; // Vermelho
            default: return [149, 165, 166]; // Cinza
        }
    }

    exportarJSON() {
        const dados = {
            ...this.metricas,
            timestamp: new Date().toISOString(),
            versao: '2.0.0'
        };

        const jsonString = JSON.stringify(dados, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        const agora = new Date();
        const dataHora = agora.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const nomeArquivo = `${equipeResponsavel}-${dataHora}.json`;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nomeArquivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    updateDateTime() {
        const agora = new Date();
        const dataHora = agora.toLocaleString('pt-BR');
        const dataElement = document.getElementById('data-geracao');
        if (dataElement) {
            dataElement.textContent = dataHora;
        }
    }
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QADashboardNova();
});

