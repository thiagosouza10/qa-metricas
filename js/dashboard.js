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

        document.getElementById('exportar-dados').addEventListener('click', () => {
            this.exportarJSON();
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
            
            // Taxa de Automação
            taxaAutomacao: parseFloat(document.getElementById('taxa-automacao').value) || 0,
            
            // Taxa de Acerto
            taxaAcerto: parseFloat(document.getElementById('taxa-acerto').value) || 0,
            
            // Defects vs Bugs
            defectsAbertos: parseInt(document.getElementById('defects-abertos').value) || 0,
            defectsFechados: parseInt(document.getElementById('defects-fechados').value) || 0,
            bugsAbertos: parseInt(document.getElementById('bugs-abertos').value) || 0,
            bugsFechados: parseInt(document.getElementById('bugs-fechados').value) || 0,
            
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
            taxaAcerto: 85
        };

        // Taxa de Escape (menor é melhor)
        if (this.metricas.taxaEscape <= metas.taxaEscape) score += 1;

        // MTTR (menor é melhor)
        if (this.metricas.mttr <= metas.mttr) score += 1;

        // Taxa de Automação (maior é melhor)
        if (this.metricas.taxaAutomacao >= metas.taxaAutomacao) score += 1;

        // Taxa de Acerto (maior é melhor)
        if (this.metricas.taxaAcerto >= metas.taxaAcerto) score += 1;

        // Falhas em produção (menor é melhor)
        if (this.metricas.falhaProducao === 0) score += 1;

        // Bugs em produção (menor é melhor)
        if ((this.metricas.bugsAbertos + this.metricas.bugsFechados) <= 3) score += 1;

        if (score >= 5) return 'EXCELENTE';
        if (score >= 4) return 'BOM';
        if (score >= 2) return 'ATENCAO';
        return 'CRITICO';
    }

    gerarPontosPositivos() {
        const pontos = [];
        const metas = {
            taxaEscape: 5,
            mttr: 8,
            taxaAutomacao: 70,
            taxaAcerto: 85
        };

        if (this.metricas.taxaEscape <= metas.taxaEscape) {
            pontos.push('Taxa de escape dentro da meta');
        }
        if (this.metricas.mttr <= metas.mttr) {
            pontos.push('MTTR dentro do esperado');
        }
        if (this.metricas.taxaAutomacao >= metas.taxaAutomacao) {
            pontos.push('Boa taxa de automação');
        }
        if (this.metricas.taxaAcerto >= metas.taxaAcerto) {
            pontos.push('Excelente taxa de acerto');
        }
        if (this.metricas.falhaProducao === 0) {
            pontos.push('Nenhuma falha em produção');
        }
        if (this.metricas.totalFalhas > 0 && this.metricas.falhaProducao === 0) {
            pontos.push('Todas as falhas identificadas antes da produção');
        }

        return pontos.length > 0 ? pontos : ['Métricas em análise'];
    }

    gerarPontosAtencao() {
        const pontos = [];
        const metas = {
            taxaEscape: 5,
            mttr: 8,
            taxaAutomacao: 70,
            taxaAcerto: 85
        };

        if (this.metricas.taxaEscape > metas.taxaEscape) {
            pontos.push('Taxa de escape acima da meta');
        }
        if (this.metricas.mttr > metas.mttr) {
            pontos.push('MTTR acima do esperado');
        }
        if (this.metricas.taxaAutomacao < metas.taxaAutomacao) {
            pontos.push('Taxa de automação abaixo da meta');
        }
        if (this.metricas.taxaAcerto < metas.taxaAcerto) {
            pontos.push('Taxa de acerto abaixo da meta');
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
        
        // Taxa de Automação
        document.getElementById('automacao-valor').textContent = `${this.metricas.taxaAutomacao}%`;
        
        // Taxa de Acerto
        document.getElementById('acerto-valor').textContent = `${this.metricas.taxaAcerto}%`;

        // Defects vs Bugs
        document.getElementById('defects-fechados-valor').textContent = this.metricas.defectsFechados;
        document.getElementById('defects-abertos-valor').textContent = this.metricas.defectsAbertos;
        document.getElementById('bugs-fechados-valor').textContent = this.metricas.bugsFechados;
        document.getElementById('bugs-abertos-valor').textContent = this.metricas.bugsAbertos;

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
                mensagem: `⚠️ Atenção: ${falhaManualRelease} falha(s) manual(is) detectada(s) em Release. Considere melhorar os testes pré-release.`
            });
        }
        if (falhaAutomatizadaRelease >= limiteAlto) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `⚠️ Atenção: ${falhaAutomatizadaRelease} falha(s) automatizada(s) detectada(s) em Release. Revise a cobertura de testes automatizados.`
            });
        }
        if (falhaProducao >= limiteAlto) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `🚨 Atenção Crítica: ${falhaProducao} falha(s) detectada(s) em Produção. Ação imediata necessária!`
            });
        } else if (falhaProducao > 0) {
            avisos.push({
                tipo: 'atencao',
                mensagem: `⚠️ Atenção: ${falhaProducao} falha(s) detectada(s) em Produção. Revise os processos de teste.`
            });
        }

        // Parabéns para falhas detectadas cedo
        const parabens = [];
        if (falhaRequisito >= limiteAlto) {
            parabens.push({
                tipo: 'sucesso',
                mensagem: `✅ Parabéns! ${falhaRequisito} falha(s) de requisito detectada(s) cedo. O time está identificando problemas antes do desenvolvimento!`
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
                    labels: ['Defects (Dev)', 'Bugs (Prod)'],
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
                    labels: ['Taxa Escape', 'MTTR', 'Automação', 'Acerto'],
                    datasets: [{
                        label: 'Atual',
                        data: [3.2, 6.2, 72.3, 85.7],
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    }, {
                        label: 'Meta',
                        data: [5, 8, 70, 85],
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
            this.charts.metas.data.datasets[0].data = [
                this.metricas.taxaEscape,
                this.metricas.mttr,
                this.metricas.taxaAutomacao,
                this.metricas.taxaAcerto
            ];
            this.charts.metas.update();
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
            
            // === PÁGINA 1: CABEÇALHO E RESUMO ===
            
            // Cabeçalho com gradiente simulado
            doc.setFillColor(52, 144, 219); // Azul
            doc.rect(0, 0, pageWidth, 40, 'F');
            
            // Logo/Título principal
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('Argo - Métricas QA', 20, 25);
            
            // Informações do relatório
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Relatório gerado em: ${this.metricas.dataGeracao}`, 20, 55);
            doc.text(`Equipe: ${this.metricas.equipeResponsavel}`, 20, 65);
            doc.text(`Período: ${this.metricas.periodoAnalise}`, 20, 75);

            // Status geral em card destacado
            const statusColor = this.getStatusColor(this.metricas.statusGeral);
            doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
            doc.roundedRect(20, 85, 80, 20, 5, 5, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(`Status Geral: ${this.metricas.statusGeral}`, 30, 98);

            // Resetar cor
            doc.setTextColor(0, 0, 0);

            // Falhas durante o ciclo de Desenvolvimento
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Falhas durante o Ciclo de Desenvolvimento', 20, 115);

            // Box para destacar as falhas
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.roundedRect(20, 120, pageWidth - 40, 75, 3, 3);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            let yPosFalhas = 130;
            doc.text(`Falha de Requisito: ${this.metricas.falhaRequisito}`, 25, yPosFalhas);
            yPosFalhas += 10;
            doc.text(`Falha Manual Pré-Release: ${this.metricas.falhaManualPreRelease}`, 25, yPosFalhas);
            yPosFalhas += 10;
            doc.text(`Falha Automatizada Pré-Release: ${this.metricas.falhaAutomatizadaPreRelease}`, 25, yPosFalhas);
            yPosFalhas += 10;
            doc.text(`Falha Manual Release: ${this.metricas.falhaManualRelease}`, 25, yPosFalhas);
            yPosFalhas += 10;
            doc.text(`Falha Automatizada Release: ${this.metricas.falhaAutomatizadaRelease}`, 25, yPosFalhas);
            yPosFalhas += 10;
            doc.setTextColor(231, 76, 60); // Vermelho
            doc.text(`Falha em Produção: ${this.metricas.falhaProducao}`, 25, yPosFalhas);
            doc.setTextColor(0, 0, 0);
            yPosFalhas += 10;
            doc.setFont('helvetica', 'bold');
            doc.text(`Total de Falhas: ${this.metricas.totalFalhas}`, 25, yPosFalhas);

            // === PÁGINA 2: MÉTRICAS PRINCIPAIS ===
            doc.addPage();
            
            // Título da página
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Métricas Principais', 20, 25);
            
            // Card Taxa de Escape
            this.drawMetricCardPDF(doc, 20, 35, 'Taxa de Escape', `${this.metricas.taxaEscape}%`, 'Meta: < 5%', 
                this.metricas.taxaEscape <= 5 ? [39, 174, 96] : [231, 76, 60]);
            
            // Card MTTR
            this.drawMetricCardPDF(doc, 105, 35, 'MTTR', `${this.metricas.mttr}h`, 'Meta: < 8h', 
                this.metricas.mttr <= 8 ? [39, 174, 96] : [231, 76, 60]);
            
            // Card Automação
            this.drawMetricCardPDF(doc, 20, 75, 'Taxa de Automação', `${this.metricas.taxaAutomacao}%`, 'Meta: > 70%', 
                this.metricas.taxaAutomacao >= 70 ? [39, 174, 96] : [231, 76, 60]);
            
            // Card Acerto
            this.drawMetricCardPDF(doc, 105, 75, 'Taxa de Acerto', `${this.metricas.taxaAcerto}%`, 'Meta: > 85%', 
                this.metricas.taxaAcerto >= 85 ? [39, 174, 96] : [231, 76, 60]);

            // Defects vs Bugs
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Defects vs Bugs', 20, 120);

            this.drawMetricCardPDF(doc, 20, 130, 'Defects Abertos', this.metricas.defectsAbertos.toString(), 'Desenvolvimento', [243, 156, 18]);
            this.drawMetricCardPDF(doc, 105, 130, 'Defects Fechados', this.metricas.defectsFechados.toString(), 'Desenvolvimento', [39, 174, 96]);
            this.drawMetricCardPDF(doc, 20, 170, 'Bugs Abertos', this.metricas.bugsAbertos.toString(), 'Produção', [231, 76, 60]);
            this.drawMetricCardPDF(doc, 105, 170, 'Bugs Fechados', this.metricas.bugsFechados.toString(), 'Produção', [39, 174, 96]);

            // === PÁGINA 3: GRÁFICOS ===
            doc.addPage();
            
            // Título da página de gráficos
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Análise Visual das Métricas', 20, 25);

            // Gráfico 1: Falhas durante o Ciclo de Desenvolvimento (Topo - Largura completa)
            try {
                const canvasFalhas = document.getElementById('falhasChart');
                if (canvasFalhas) {
                    const imgData = await this.captureChartAsImage(canvasFalhas);
                    // Título do gráfico
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Falhas durante o Ciclo de Desenvolvimento', 20, 35);
                    // Gráfico maior e centralizado
                    const imgWidth = pageWidth - 40; // Largura total menos margens
                    const imgHeight = 70;
                    doc.addImage(imgData, 'PNG', 20, 40, imgWidth, imgHeight);
                }
            } catch (e) {
                console.log('Erro ao capturar gráfico de Falhas:', e);
            }

            // Gráfico 2 e 3: Comparação com Metas e Defects vs Bugs (Lado a lado)
            const yStart = 120;
            const graphWidth = (pageWidth - 50) / 2; // Largura para cada gráfico (com espaço entre eles)
            const graphHeight = 70;

            // Gráfico de Comparação com Metas (Esquerda)
            try {
                const canvasMetas = document.getElementById('metasChart');
                if (canvasMetas) {
                    const imgData = await this.captureChartAsImage(canvasMetas);
                    // Título do gráfico
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Comparação com Metas', 20, yStart);
                    // Gráfico
                    doc.addImage(imgData, 'PNG', 20, yStart + 5, graphWidth, graphHeight);
                }
            } catch (e) {
                console.log('Erro ao capturar gráfico de Metas:', e);
            }

            // Gráfico Defects vs Bugs (Direita)
            try {
                const canvasDefectsBugs = document.getElementById('defectsBugsChart');
                if (canvasDefectsBugs) {
                    const imgData = await this.captureChartAsImage(canvasDefectsBugs);
                    // Título do gráfico
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Defects vs Bugs', 20 + graphWidth + 10, yStart);
                    // Gráfico
                    doc.addImage(imgData, 'PNG', 20 + graphWidth + 10, yStart + 5, graphWidth, graphHeight);
                }
            } catch (e) {
                console.log('Erro ao capturar gráfico Defects vs Bugs:', e);
            }

            // === PÁGINA 4: ANÁLISE EXECUTIVA ===
            doc.addPage();
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Análise Executiva', 20, 30);

            // Pontos positivos
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(39, 174, 96); // Verde
            doc.text('Pontos Positivos:', 20, 50);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            this.metricas.pontosPositivos.forEach((ponto, index) => {
                doc.text(`- ${ponto}`, 25, 65 + (index * 12));
            });

            // Pontos de atenção
            const yPos = 65 + (this.metricas.pontosPositivos.length * 12) + 20;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(243, 156, 18); // Amarelo
            doc.text('Pontos de Atencao:', 20, yPos);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            this.metricas.pontosAtencao.forEach((ponto, index) => {
                doc.text(`- ${ponto}`, 25, yPos + 15 + (index * 12));
            });

            // Observações
            if (this.metricas.observacoes) {
                const obsYPos = yPos + (this.metricas.pontosAtencao.length * 12) + 30;
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(52, 144, 219); // Azul
                doc.text('Observações:', 20, obsYPos);
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                // Quebrar texto longo em múltiplas linhas
                const splitObservacoes = doc.splitTextToSize(this.metricas.observacoes, pageWidth - 40);
                doc.text(splitObservacoes, 20, obsYPos + 15);
            }

            // Rodapé
            doc.setFontSize(9);
            doc.setTextColor(128, 128, 128);
            doc.text('Relatório gerado automaticamente pelo Dashboard QA', pageWidth - 100, pageHeight - 10);

            // Gerar nome do arquivo
            const agora = new Date();
            const dataHora = agora.toISOString().replace(/[:.]/g, '-').slice(0, 19);
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

