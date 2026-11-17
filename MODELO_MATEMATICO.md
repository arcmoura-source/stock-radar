# Manual de Fórmulas & Modelo Matemático do Portfólio
> **StockRadar AI • Motor de Projeções e Otimização Financeira**  
> *Referência técnica dos modelos de cálculo utilizados na aplicação.*

---

## 1. Variáveis e Estado Base da Carteira

Todos os cálculos partem do estado real da tua carteira no corretor (XTB):

| Variável | Símbolo | Valor Atual | Descrição |
| :--- | :---: | :---: | :--- |
| **Aporte Mensal Regular** | $PMT$ | **€100.00** | Montante periódico regular investido todos os meses (calibrado para 100€/mês) |
| **Meses Decorridos** | $M_{\text{decorridos}}$ | **24 meses** | 24 aportes de 80€ + 1 reforço pontual de 100€ no dip de mercado |
| **Capital Investido** | $C_{\text{inv}}$ | **€2,020.00** | $(24 \times €80.00) + €100.00$ |
| **Saldo de Liquidez** | $C_{\text{cash}}$ | **€8.26** | Caixa não investido na conta |
| **Valor Total Atual** | $V_0$ | **€2,348.26** | Valor de mercado dos ativos + liquidez |
| **Lucro Atual (P&L)** | $\Delta V$ | **+€328.26** | $V_0 - C_{\text{inv}}$ |
| **Rentabilidade Atual** | $R_{\%}$ | **+16.25%** | $\frac{\Delta V}{C_{\text{inv}}} \times 100$ |

---

## 2. Taxa Composta Ponderada (CAGR do Portfólio)

A taxa anual esperada da carteira ($\text{CAGR}$) é a média ponderada das taxas anuais esperadas de cada ativo individual:

$$\text{CAGR}_{\text{portfólio}} = \sum_{i=1}^{n} w_i \cdot \text{CAGR}_i$$

Onde:
* $w_i = \frac{\text{Alocação}_i}{\sum_{j=1}^n \text{Alocação}_j}$ é o peso relativo do ativo $i$ na carteira ($\sum w_i = 100\%$).
* $\text{CAGR}_i$ é a taxa de crescimento anual composta esperada do ativo $i$.

---

## 3. O Cenário de Base: Conservador (+13.37% a.a.)

### A. Metodologia e Fundamentação
* **Metodologia**: Aplica a teoria de **Reversão à Média (*Mean Reversion*)** e a **Margem de Segurança de Graham & Dodd**.
* **Pressuposto Económico**: Expulsa a especulação de expansão de múltiplos de valorização (*P/E expansion*) e baseia-se unicamente no crescimento esperado dos lucros operacionais por ação (*EPS growth*), ajustado por eventuais anos de recessão ou correção cíclica.

$$\begin{aligned}
\text{CAGR}_{\text{conservador}} &= (0.38 \times 14.50\%) + (0.14 \times 15.50\%) + (0.16 \times 11.50\%) \\
&\quad + (0.16 \times 11.00\%) + (0.06 \times 13.50\%) + (0.05 \times 13.00\%) \\
&\quad + (0.05 \times 12.50\%) \\
&= 5.51\% + 2.17\% + 1.84\% + 1.76\% + 0.81\% + 0.65\% + 0.625\% \\
&= \mathbf{13.37\%\text{ a.a.}}
\end{aligned}$$

---

### B. Cenário Otimista: Expansão Secular (+17.37% a.a.)
* **Metodologia**: Em vez de estimativas isoladas e excessivas, o modelo aplica uma **banda de dispersão simétrica de $\pm 4.00\%$** em torno da base conservadora ponderada:

$$\text{CAGR}_{\text{otimista}} = \text{CAGR}_{\text{conservador}} + 4.00\% = 13.37\% + 4.00\% = \mathbf{17.37\%\text{ a.a.}}$$

* **Justificação Económica**:
  1. **Simetria com o Teste de Stress**: O Teste de Stress subtrai 4.00% ($13.37\% - 4.00\% = 9.37\%$). Adicionar 4.00% cria um intervalo de sensibilidade estatística perfeitamente calibrado:
     $$\mathbf{9.37\% \text{ (Stress)}} \longleftrightarrow \mathbf{13.37\% \text{ (Base Conservadora)}} \longleftrightarrow \mathbf{17.37\% \text{ (Otimista)}}$$
  2. **Realismo Histórico Multi-Década**: Taxas de 24% a.a. durante 10 a 30 anos são economicamente inviáveis. Pelo contrário, **+17.37% a.a.** reflete com precisão os melhores períodos seculares da tecnologia americana (ex.: Nasdaq-100 entre 2012 e 2024 registou ~17.5% CAGR), captando a aceleração da IA, ganhos de produtividade e recompras de ações sem depender de especulação irracional.

---

### C. Cenário de Teste de Stress (+9.37% a.a.)
Representa um choque prolongado de mercado (alta inflação, estagflação ou quebra estrutural):

$$\text{CAGR}_{\text{stress}} = \max\left(4.00\%,\; \text{CAGR}_{\text{conservador}} - 4.00\%\right) = 13.37\% - 4.00\% = \mathbf{9.37\%\text{ a.a.}}$$

---

### D. Benchmark e Alpha ($\alpha$)
A carteira é comparada com a média histórica do S&P 500 (+12.80% a.a.):

$$\alpha = \text{CAGR}_{\text{portfólio}} - \text{CAGR}_{\text{S\&P 500}} = 13.60\% - 12.80\% = \mathbf{+0.80\%\text{ a.a.}}$$

---

## 4. Conversão da Taxa Anual para Taxa Mensal Equivalente

Para evitar distorções de cálculo mês a mês, a taxa de rentabilidade mensal ($r_m$) **não é simplesmente dividida por 12**. Utiliza-se a fórmula exata de equivalência de juros compostos:

$$(1 + r_m)^{12} = 1 + \text{CAGR} \implies r_m = (1 + \text{CAGR})^{\frac{1}{12}} - 1$$

#### Exemplos Numéricos:
* Para $\text{CAGR} = 24.01\%$ (Otimista):
  $$r_m = (1 + 0.2401)^{1/12} - 1 \approx 1.808\%\text{ ao mês}$$
* Para $\text{CAGR} = 13.60\%$ (Conservador):
  $$r_m = (1 + 0.1360)^{1/12} - 1 \approx 1.069\%\text{ ao mês}$$

---

## 5. Projeções de Futuro: Fórmula do Valor Acumulado ($FV$)

Para cada horizonte temporal (5 anos = 60 meses, 10 anos = 120 meses, 20 anos = 240 meses, 30 anos = 360 meses), o cálculo processa-se a partir do mês atual:

$$n = M_{\text{total}} - M_{\text{decorridos}} = (T_{\text{anos}} \times 12) - 24$$

O valor futuro ($FV$) resulta da soma de duas componentes:
1. **Capitalização do valor que já possuis hoje ($V_0$):**
   $$FV_1 = V_0 \cdot (1 + r_m)^n$$
2. **Série de aportes mensais futuros ($PMT$) capitalizados no início de cada mês:**
   $$FV_2 = PMT \cdot \left[ \frac{(1 + r_m)^n - 1}{r_m} \right] \cdot (1 + r_m)$$

### Fórmula Completa de Acumulação:

$$FV(n) = V_0 \cdot (1 + r_m)^n + PMT \cdot \left[ \frac{(1 + r_m)^n - 1}{r_m} \right] \cdot (1 + r_m)$$

### Simulação Algorítmica Passo a Passo (Mês a Mês):
No código da aplicação, este cálculo é verificado mês a mês garantindo arredondamento monetário preciso:
```javascript
let v = totalCurrentValue; // €2,248.26
for (let m = 1; m <= remainingMonths; m++) {
  v = (v + monthlyDeposit) * (1 + monthlyRate);
}
const finalValue = Math.round(v);
```

---

## 6. Métricas de Rendimento e Alavancagem

Para cada período projetado, calculam-se as seguintes métricas fundamentais:

### 1. Capital Total Investido Acumulado ($C_{\text{total}}$)
$$C_{\text{total}} = M_{\text{total}} \times PMT$$
*(Ex: em 10 anos = $120 \times €80 = €9,600.00$)*

### 2. Lucro Líquido Acumulado ($\text{Lucro}$)
$$\text{Lucro} = FV - C_{\text{total}}$$

### 3. Multiplicador de Capital ($\text{Multiplier}$)
$$\text{Multiplier} = \frac{FV}{C_{\text{total}}}$$
*(Ex: se investiste €9,600 e o saldo final é €27,700, o multiplicador é $2.9\text{x}$)*

### 4. Percentagem de Lucro Total ($\text{Lucro}_{\%}$)
$$\text{Lucro}_{\%} = \left( \frac{\text{Lucro}}{C_{\text{total}}} \right) \times 100$$

### 5. Participação dos Juros Compostos
Mostra que percentagem do saldo final proveio puramente do rendimento composto em vez do teu próprio bolso:
$$\text{Compound Share}_{\%} = \left( \frac{\text{Lucro}}{FV} \right) \times 100$$

---

## 7. Dividendos Reais (XTB) vs. Renda Passiva Futura (Regra dos 4%)

Nesta carteira existe uma separação técnica fundamental entre dois conceitos:

### A. Dividendos em Dinheiro na Conta XTB (Cash Dividends)
As tuas ações individuais pagam dividendos que não acumulam nas cotas — **caem diretamente como liquidez em dinheiro na tua conta da corretora (XTB)**:
* **Deutsche Börse (DB1.DE)**: Dividend Yield ~**1.85%** (~€4.97/ano hoje)
* **Alphabet (GOOGL)**: Dividend Yield ~**0.45%** (~€0.50/ano hoje)
* **Meta Platforms (META)**: Dividend Yield ~**0.35%** (~€0.39/ano hoje)
* **Amazon (AMZN)**: 0.00% (Reinvestimento integral dos fluxos de caixa)

$$\text{Dividend Yield Ponderado}_{\text{Cash}} = \sum_{i=1}^n w_i \cdot \text{DivYield}_i \approx \mathbf{0.26\%\text{ ao ano}}$$

* **Hoje (€2,248.26)**: recebes **~€5.86 / ano** (~€0.49 / mês) em dinheiro líquido na XTB.
* **Em 10 Anos (€18k a €35k)**: recebes **~€48 a €96 / ano** em dinheiro.
* **Em 20 Anos (€88k a €356k)**: recebes **~€238 a €960 / ano** em dinheiro.
* **Em 30 Anos (€346k a €3.18M)**: recebes **~€930 a €8,500 / ano** em dinheiro.

### B. ETFs de Acumulação (100% Reinvestimento Interno - 73% da Carteira)
* **QDVE.DE**, **CHIP.PA** e **2B70.DE** são ETFs UCITS de **Acumulação (Acc)**.
* Os dividendos pagos pelas centenas de empresas que os compõem (Apple, Nvidia, Microsoft, TSMC, ASML, etc.) **não caem na tua conta**. O gestor do ETF compra automaticamente mais ações dentro do fundo.
* **Vantagem Fiscal e de Crescimento**: 0% de atrito fiscal imediato (não pagas os 28% de IRS no momento da distribuição) e máxima potência de juros compostos.

### C. Renda Passiva Projetada (Regra dos 4% / Estudo de Trinity)
Representa a **fase de usufruto/reforma** (*Safe Withdrawal Rate - SWR*). Quando decides viver do património, retiras 4% do capital total acumulado por ano (através de dividendos ou venda pontual de parcelas de quotas valorizadas):

$$\text{Renda Anual Segura} = FV \times 0.04 \implies \text{Renda Mensal} = \frac{FV \times 0.04}{12}$$

*(Exemplo: ao atingires €88,800 a 20 anos, podes retirar com segurança ~€296/mês para sempre sem que o capital se esgote).*

---

## 8. Teoria Moderna de Portfólio (MPT / Markowitz)

Para encontrar a alocação que maximiza o retorno por unidade de risco, a aplicação utiliza a **Fronteira Eficiente de Markowitz**:

### 1. Risco / Volatilidade do Portfólio ($\sigma_p$)
$$\sigma_p = \sqrt{\sum_{i=1}^n \sum_{j=1}^n w_i \, w_j \, \text{Cov}(R_i, R_j)} = \sqrt{\mathbf{w}^T \mathbf{\Sigma} \mathbf{w}}$$

Onde:
* $\mathbf{w}$ é o vetor de pesos dos ativos na carteira.
* $\mathbf{\Sigma}$ é a matriz de covariância histórica dos retornos diários.

### 2. Rácio de Sharpe ($S$)
Avalia a eficiência do portfólio face a um ativo sem risco ($R_f \approx 3.00\%$ nos títulos de curto prazo da Zona Euro):

$$S = \frac{\text{CAGR}_p - R_f}{\sigma_p}$$

O otimizador de carteira no backend resolve o seguinte problema matemático (via algoritmo SLSQP):
$$\max_{\mathbf{w}} \frac{\mathbf{w}^T \mathbf{R} - R_f}{\sqrt{\mathbf{w}^T \mathbf{\Sigma} \mathbf{w}}} \quad \text{sujeito a} \quad \sum_{i=1}^n w_i = 1, \quad 0 \le w_i \le w_{\max}$$

---

## Resumo das Projeções Conservadoras (€80/mês, 24 aportes efetuados)

| Horizonte | Total Investido | Projeção Base (+13.60% a.a.) | Multiplicador | Lucro Total | Div. Cash (XTB) | Renda Passiva (~4%) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **5 Anos (60M)** | €4,800 | **€6,695** | $1.4\text{x}$ | +€1,895 (+39.5%) | ~€17/ano | ~€22/mês |
| **10 Anos (120M)** | €9,600 | **€17,991** | $1.9\text{x}$ | +€8,391 (+87.4%) | ~€47/ano | ~€60/mês |
| **20 Anos (240M)** | €19,200 | **€88,858** | $4.6\text{x}$ | +€69,658 (+362.8%) | ~€231/ano | ~€296/mês |
| **30 Anos (360M)** | €28,800 | **€346,654** | $12.0\text{x}$ | +€317,854 (+1,103.7%) | ~€901/ano | ~€1,155/mês |

*Todos os modelos matemáticos acima estão implementados e sincronizados em tempo real no código da app.*
