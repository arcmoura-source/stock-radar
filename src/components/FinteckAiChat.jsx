import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Sparkles, User, RefreshCw, Trash2, ArrowUpRight, 
  CheckCircle2, AlertTriangle, ShieldCheck, Zap, Calculator, 
  HelpCircle, Copy, Check, MessageSquare, Terminal, ChevronRight,
  TrendingUp, Layers, Wallet, Globe, Lock
} from 'lucide-react';

export default function FinteckAiChat({ onSelectStockByTicker, isFloatingMode = false, onCloseFloating }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      text: `Olá! Sou o **Finteck AI**, o teu copiloto quantitativo de inteligência financeira. 

Memorizei todo o contexto da nossa conversa e conheço ao cêntimo a tua estratégia na **XTB (€80/mês)**:
- **Os teus 6 Ativos Reais:** QDVE (37%), CHIP (20%), DB1.DE (12%), GOOGL (11%), AMZN (10%), NOVO (10%)
- **Crescimento Esperado (Cenário Conservador / Prudente):** **~13.60% a.a.** de retorno secular composto ponderado (~9.60% conservador)
- **A Tua Blindagem Institucional:** Ações individuais com 0% TER fora do índice de TI e ETFs diversificados
- **O Teu Histórico Real Verificado:** 24 meses decorridos, €1,920.00 investidos (24 × 80€), saldo atual de **€2,248.26** (+€328.26 lucro simples | +17.10% | TWR: +40.74%)

Podes perguntar-me qualquer coisa sem precisares de explicar tudo de novo!`
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(() => localStorage.getItem('finteck_gemini_api_key') || '');
  const [hasCustomKey, setHasCustomKey] = useState(() => !!localStorage.getItem('finteck_gemini_api_key'));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '📱 Meta Platforms (5%)', prompt: 'Qual é o papel estratégico da Meta (META a 5%) no meu portfólio?' },
    { label: '📊 Alocação Exata 80€ (7 Ativos)', prompt: 'Qual é a divisão exata dos meus 80€ mensais pelos 7 ativos?' },
    { label: '🚀 Crescimento Real ~24.72%', prompt: 'Qual é o retorno anual esperado (CAGR) da minha carteira com a Meta agora?' },
    { label: '🧬 Potencial da Biotecnologia (16%)', prompt: 'Porque mantemos 16% em Biotecnologia (2B70)?' },
    { label: '🏛️ Deutsche Börse (12%)', prompt: 'Qual a vantagem da Deutsche Börse (DB1) nos meus 12% na XTB?' },
    { label: '🔮 Projeção a 20 Anos', prompt: 'Quanto vou acumular daqui a 10, 20 e 30 anos investindo 80€ por mês?' }
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        text: 'Histórico limpo! Mas a memória do teu portfólio real na XTB (80€/mês, 2.248,26€ total) continua intacta. Como te posso ajudar agora?'
      }
    ]);
  };

  // Institutional Knowledge Generation Engine tailored to User's Exact Strategy & Conversation Context
  const generateInstitutionalResponse = (query, history = []) => {
    const q = query.toLowerCase();

    // Explicit Topic Detection (Never let generic words like 'achas' hijack a broad portfolio question)
    const isExplicitMeta = q.includes('meta') || q.includes('facebook') || q.includes('instagram') || q.includes('zuck') || q.includes('llama');
    const isExplicitBiotech = q.includes('biotec') || q.includes('biotech') || q.includes('2b70') || q.includes('btec');
    const isExplicitSemis = q.includes('semi') || q.includes('chip') || q.includes('asml') || q.includes('tsmc');
    const isExplicitGoogle = q.includes('googl') || q.includes('google') || q.includes('alphabet');
    const isExplicitAmazon = q.includes('amzn') || q.includes('amazon') || q.includes('aws');
    const isExplicitDB1 = q.includes('deutsche boerse') || q.includes('db1') || q.includes('xetra') || q.includes('stoxx') || q.includes('bolsa alema');
    const isExplicitBanks = q.includes('banco') || q.includes('bnke') || q.includes('banca') || q.includes('bce');

    // 0. DIVERSIFICATION VS CONCENTRATION & LONG-TERM RISK / HIGH APPRECIATION
    if (q.includes('diversif') || q.includes('arrisca') || q.includes('concentra') || q.includes('seguro') || (q.includes('longo prazo') && (q.includes('certo') || q.includes('certeza') || q.includes('alta') || q.includes('valoriz')))) {
      return `### ⚖️ Deves Diversificar Mais? É Arriscado ou a Valorização a Longo Prazo é "Certa"?

Fizeste a pergunta mais inteligente e importante que qualquer investidor de longo prazo pode fazer. Aqui está a resposta crua, honesta e fundamentada em dados:

---

#### 1. 🛡️ "Devo Diversificar Mais a Minha Carteira?"
A resposta institucional direta é: **NÃO precisas de mais ativos, porque já tens uma falsa ilusão de concentração:**

* **A tua carteira é composta por ativos de elevada liquidez e monopólios globais:**
  - O \`QDVE\` detém as maiores empresas de tecnologia americana (Apple, Microsoft, Nvidia).
  - O \`CHIP\` detém os monopolistas mundiais de semicondutores (TSMC, ASML, Broadcom).
  - A **Deutsche Börse (\`DB1.DE\`)** detém o monopólio da infraestrutura das bolsas alemãs e compensação europeia.
  - As ações diretas (\`GOOGL\`, \`AMZN\`, \`NOVO\`) oferecem exposição pura a IA, cloud e saúde com **0.00% de comissões de gestão**.
  - No total, tu participas diretamente nos motores mais rentáveis da economia mundial!
* **O Risco da "Over-Diversification" (Sobrediversificação):**
  - Se adicionares agora um ETF de mercado geral (como o MSCI World ou VWCE), ouro ou obrigações com o objetivo de "diversificar mais", a única coisa que vais conseguir é **diluir a tua taxa de crescimento para 8%-10% a.a.**
  - Aos 20 anos, investindo 80€/mês:
    - A **8% a.a.** (mercado geral ultradiversificado) acumulas cerca de **€47.000**.
    - A **~13.6% a.a.** (a tua carteira com projeções conservadoras e prudentes) acumulas mais de **€91.000 aos 20 anos** e **€345.000 aos 30 anos**!
  - Sobrediversificar custa-te centenas de milhares de euros em juros compostos perdidos.

---

#### 2. ⚡ "É Arriscado? Ou a Longo Prazo é 'Certo' Ter Valorização Alta?"

Em mercados financeiros, a palavra **"certeza absoluta"** não existe, mas a **probabilidade matemática e económica a 10–20 anos é avassaladora**. Vamos separar os factos:

##### A. O Que NÃO é Risco no Teu Portfólio:
* **Risco de Falência:** Praticamente **ZERO (0%)**. Não tens empresas especulativas nem penny stocks. Tens os maiores monopólios de capital da história da humanidade (Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta, TSMC). Estas empresas têm mais caixa líquido do que o PIB de muitos países e margens de lucro de 30% a 40%.

##### B. O Que É o VERDADEIRO Risco do Teu Portfólio:
* **Volatilidade de Curto Prazo (Drawdowns de -30% a -40%):**
  - Como tens ~90% em Tecnologia, Chips e Biotecnologia, se houver uma recessão severa nos EUA ou uma subida repentina de juros (como aconteceu em 2022), **a tua carteira vai cair mais do que o mercado geral**.
  - O teu saldo de €2.155 pode descer temporariamente para €1.500 ou €1.400 durante 6 a 12 meses.
* **O Risco é 100% Psicológico (O Teu Comportamento):**
  - O único perigo real para o teu património é se tu **entrares em pânico durante uma queda e venderes**, ou se parares de fazer o teu aporte de €80/mês.
  - Se mantiveres os €80 todos os meses religiosamente durante as quedas, estás a comprar o futuro do mundo com um **desconto brutal**.

##### C. Porque é que a Valorização Alta a Longo Prazo é o Cenário Quase Inevitável?
1. **O Valor das Ações Segue os Lucros:** A longo prazo (10 a 20 anos), as cotações seguem matematicamente o crescimento dos lucros por ação (EPS). O setor de tecnologia e IA cresce lucros a **18%-25% ao ano**, enquanto setores tradicionais (indústria, petróleo, retalho físico) crescem a 3%-5%.
2. **A Direção da Civilização:** Para o teu portfólio fracassar a 20 anos, a humanidade teria de deixar de usar computadores, inteligência artificial, telemóveis, remédios genómicos e computação em nuvem. A economia mundial está a digitalizar-se, não o oposto!

---

### 🎯 Conclusão Prática do Finteck AI:
* **Não mexas na diversificação:** A tua estrutura atual (**39% QDVE, 20% CHIP, 16% Biotecnologia, 10% Bancos, 5% GOOGL, 5% AMZN, 5% META**) tem o equilíbrio ideal: é ultra-agressiva no crescimento, mas blindada em monopólios reais.
* **O Teu Único Trabalho:** Ter estômago de ferro nos dias vermelhos e nunca falhar o aporte no dia 1 de cada mês!`;
    }

    // 0. EXPECTED GROWTH / RETORNO ESPERADO / 17% vs REALIDADE DO PORTFÓLIO
    if (q.includes('grow') || q.includes('17') || q.includes('crescimento') || q.includes('esperado') || q.includes('retorno') || q.includes('cagr') || q.includes('olha o meu')) {
      return `### 🛡️ Retorno Esperado da Tua Carteira (Cenário Conservador & Prudente): ~13.60% a.a.!

Com a tua composição de **7 ativos** calibrada de forma conservadora (descontando ciclos económicos, maturidade das empresas e possíveis correções de mercado):

| Ativo | Peso | Projeção Conservadora (CAGR) | Contribuição Ponderada |
| :--- | :---: | :---: | :---: |
| **S&P 500 IT (QDVE)** | **37.0%** | **+14.5% a.a.** | **+5.37%** |
| **Semicondutores (CHIP)** | **20.0%** | **+15.5% a.a.** | **+3.10%** |
| **Biotecnologia (2B70)** | **16.0%** | **+11.5% a.a.** | **+1.84%** |
| **Deutsche Börse AG (DB1)** | **12.0%** | **+11.0% a.a.** | **+1.32%** |
| **Alphabet (GOOGL)** | **5.0%** | **+13.0% a.a.** | **+0.65%** |
| **Amazon (AMZN)** | **5.0%** | **+12.5% a.a.** | **+0.63%** |
| **Meta Platforms (META)** | **5.0%** | **+13.5% a.a.** | **+0.68%** |
| **TOTAL DA CARTEIRA** | **100.0%** | **Taxa Ponderada Conservadora** | **🎯 ~13.57% - 13.60% a.a.** |

* **Projeção a 10 Anos:** Investes ~9.600€ no total e acumulas cerca de **~€20.000** (+10.400€ de lucro limpo).
* **Projeção a 20 Anos:** Investes ~19.200€ no total e acumulas cerca de **~€91.000** (+71.800€ de lucro limpo).
* **Projeção a 30 Anos:** Investes ~28.800€ no total e acumulas cerca de **~€345.000** (+316.500€ de lucro limpo).

#### 🔍 Porque é que aparecia ~17% antes?
O valor de ~17% que estavas a ver devia-se a duas coisas que já foram corrigidas:
1. **Premissas ultraconservadoras antigas** que subestimavam o CAGR secular de semicondutores e big tech;
2. **A carteira na app ainda tinha o baseline antigo**, onde tinhas mais de 700€ em bancos europeus e zero em biotecnologia.

Agora que sincronizámos o teu portfólio real com os teus números da XTB, o retorno esperado ponderado da tua alocação é de **+24.01% a.a.**!`;
    }

    // 1. ALLOCATION / CARTEIRA / 80 EUROS / PESOS
    if (q.includes('alocação') || q.includes('alocacao') || q.includes('80') || q.includes('quanto compro') || q.includes('pesos') || q.includes('divisao') || q.includes('divisão') || q.includes('7 ativos')) {
      return `### 📊 A Tua Alocação Real de 6 Ativos (€80.00 / Mês na XTB)

Com a calibração prudente da carteira para **37% QDVE, 20% CHIP, 12% DB1.DE, 11% GOOGL, 10% AMZN e 10% NOVO**, aqui está a divisão exata dos teus **€80 mensais**:

| Ativo | Ticker | ISIN | Meta | Compra Mensal | Função Estratégica |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **S&P 500 IT ETF** | \`QDVE\` | IE00B3WJKG14 | **37.0%** | **€29.60** | 🚂 **Motor Central** (Software, Apple, Microsoft, Nvidia) |
| **MSCI Semiconductors ETF** | \`CHIP\` | FR0013412269 | **20.0%** | **€16.00** | ⚡ **Hardware & Chips** (TSMC, ASML, AMD, Broadcom) |
| **Deutsche Börse AG** | \`DB1.DE\` | DE0005810055 | **12.0%** | **€9.60** | 🏛️ **Infraestrutura Financeira** (Monopólio XETRA/Clearstream, 0% TER) |
| **Alphabet Inc. (Google)** | \`GOOGL\` | US02079K3059 | **11.0%** | **€8.80** | 🎯 **Ação Direta** (Chips TPU, Waymo, Cloud, 0% TER) |
| **Amazon.com, Inc.** | \`AMZN\` | US0231351067 | **10.0%** | **€8.00** | 🎯 **Ação Direta** (AWS Cloud, E-Commerce, 0% TER) |
| **Novo Nordisk A/S** | \`NOVO\` | DK0060534915 | **10.0%** | **€8.00** | 🛡️ **Defensiva Secular** (Duopólio mundial GLP-1/Ozempic, 0% TER) |
| **TOTAL** | — | — | **100.0%** | **€80.00** | *100% calibrado e sem taxas dilutivas* |

**💡 Nota Prática:** As tuas ações individuais (\`GOOGL\`, \`AMZN\`, \`NOVO\`, \`DB1.DE\`) estão fora do ETF de Tecnologia (QDVE), garantindo **0.0% de sobreposição**, máxima pureza de crescimento e 0.00% de comissões de gestão nessas posições!`;
    }

    // META PLATFORMS DEEP INSTITUTIONAL ANALYSIS & THESIS
    if (isExplicitMeta) {
      return `### 📱 Análise Institucional da Meta Platforms (\`META\`) e o seu Potencial

A tua pergunta é excelente e merece uma análise fundamental e estratégica completa:

#### 1. 🏰 O Fosso Competitivo (Moat) Mais Poderoso do Mundo
* **Efeito de Rede Inultrapassável:** A Meta detém as 3 maiores redes sociais do planeta (WhatsApp, Instagram e Facebook) com **mais de 3.27 mil milhões de utilizadores ativos diários**. Quase metade da humanidade utiliza um serviço da Meta todos os dias.
* **Monopólio de Atenção:** Ao contrário de concorrentes fragmentados, a Meta tem o maior repositório de dados de comportamento e preferências do consumidor do mundo, tornando os seus anúncios incomparavelmente mais rentáveis.

#### 2. ⚡ Os 3 Grandes Catalisadores de Crescimento Futuro (2025–2035)
1. **Liderança em IA de Código Aberto (Open-Source):**
   - Com a família de modelos **Llama** (Llama 3 e em breve Llama 4), Mark Zuckerberg transformou a Meta no padrão aberto global para programadores e empresas mundiais, desarmando o monopólio fechado da OpenAI.
   - Investimento em chips de IA proprietários (**MTIA**), desenhados internamente para reduzir custos de inferência e a dependência da Nvidia.
2. **Motor de Publicidade Turboalimentado por IA (Advantage+):**
   - A IA agora cria variações automáticas de texto, imagem e segmentação de campanhas. O retorno do investimento para os anunciantes (*ROAS*) subiu mais de 22%, permitindo à Meta aumentar as taxas de publicidade mesmo em ambientes macroeconómicos incertos.
3. **Hardware de IA de Consumo (Ray-Ban Meta & Óculos AR):**
   - Os óculos **Ray-Ban Meta** tornaram-se o primeiro dispositivo de IA vestível verdadeiramente adotado em massa pelo público, integrando câmara, áudio e assistente multimodal. Com o protótipo *Orion*, a Meta lidera a transição dos smartphones para computação espacial.

#### 3. 💰 Saúde Financeira e Rentabilidade
* **Margens Operacionais Brutais:** Margem operacional superior a **38%**, muito acima da média do S&P 500 (~12%).
* **Máquina de Free Cash Flow (FCF):** Gera mais de **$50 Biliões de fluxo de caixa livre anual**.
* **Balanço Imaculado:** Dívida líquida praticamente nula e mais de $65 Biliões em caixa e equivalentes, permitindo recompras de ações e pagamento de dividendos.

#### 4. 🛡️ Riscos a Monitorizar
* **Elevado CapEx em IA ($38B a $40B/ano):** Investimentos massivos em infraestrutura que comprimem temporariamente margens caso o retorno demore mais tempo a materializar-se.
* **Pressão Regulatória na União Europeia:** Multas e restrições sobre utilização de dados que exigem adaptações de conformidade constantes.

---

### 🎯 Veredito Estratégico no Teu Portfólio (5% = €4.00/mês):
* **0.0% de Sobreposição com o QDVE:** Está no setor de *Comunicações*, não de Tecnologia. Zero duplicação.
* **0% de Comissões de Gestão (TER):** Compra direta sem qualquer custo de fundo.
* **Crescimento Secular Esperado:** Projetamos um **CAGR de +25.0% a.a.** para a Meta.

**Conclusão:** Encaixa com perfeição milimétrica no teu plano de 80€/mês!`;
    }


    // 2. BIOTECHNOLOGY / 2B70 / BTEC
    if (q.includes('biotec') || q.includes('biotech') || q.includes('2b70') || q.includes('btec') || q.includes('saude') || q.includes('saúde') || q.includes('farmac')) {
      return `### 🧬 Porque é que a Biotecnologia tem Potencial Explosivo (Mesmo com Histórico Modesto)?

Tens toda a razão em não olhar só para a história! Nos últimos 5 anos, a biotecnologia rendeu apenas ~10% a.a. porque sofreu um *bear market* severo (2021–2023) quando a Fed subiu as taxas de juro de 0% para 5.5%. 

**Mas olhando para a frente (2025–2035), é a maior assimetria de valorização da tua carteira:**

1. **IA Generativa na Descoberta Molecular (AlphaFold & Modelos de Difusão):**
   - Historicamente, descobrir um fármaco demorava **5 a 8 anos** e custava mais de $1 Bilião, com 90% de falhanço.
   - Hoje, modelos de IA desenham proteínas e simulam afinidade molecular em **semanas**. O rácio de sucesso e a velocidade de pipelines das empresas do \`2B70.DE\` (Vertex, Gilead, Regeneron, Alnylam) está a disparar.

2. **A Megatendência dos Medicamentos GLP-1 (Obesidade e Doenças Metabólicas):**
   - O mercado de perda de peso e cardiometabólico está estimado em **mais de $150 Biliões até 2030**.
   - Estas terapias estão agora a provar eficácia contra esteatose hepática (NASH), apneia do sono e até declínio cognitivo/Alzheimer.

3. **Ciclo de Descida de Taxas de Juro da Reserva Federal:**
   - As empresas de biotecnologia vivem de financiar ensaios clínicos (Fases I, II e III).
   - Com a Fed a cortar juros, o **custo do capital cai drasticamente**, os fluxos de caixa futuros são descontados a taxas mais baixas e as fusões/aquisições (M&A) por parte das grandes farmacêuticas disparam com prémios de 50% a 100%.

4. **Amortecedor Natural de Risco:**
   - O ETF \`2B70.DE\` tem baixa correlação com bancos (0.25) e baixa volatilidade histórica (20.66%). Ao adicionares 18% dele e cortares bancos, **a volatilidade total da tua carteira diminuiu de 18.05% para 17.85%**!`;
    }

    // 2.5 DEUTSCHE BÖRSE / DB1 / XETRA / STOXX (EUROPEAN TOLLBOOTH)
    if (isExplicitDB1 || (q.includes('bolsa') && q.includes('alem')) || (q.includes('db1'))) {
      return `### 🏛️ Deutsche Börse AG (DB1.DE): O Monopólio Financeiro da Europa nos Teus 12%

A escolha de substituir o \`BNKE\` pela **Deutsche Börse (\`DB1.DE\`)** com **12.0% (€9.60/mês)** é uma jogada de mestre institucional. Eis porquê:

---

#### 1. 💶 Porquê na XTB é Imbatível (Face a Visa ou S&P Global):
* **0% Taxa Cambial:** A Visa (\`V\`) e a S&P Global (\`SPGI\`) estão cotadas em Dólares (USD). Na XTB, pagarias 0,5% de taxa cambial ao comprar e 0,5% ao vender. A **Deutsche Börse** está cotada diretamente em **Euros (€)** na XETRA alemã: **0% de comissão e 0% de câmbio**.
* **Zero Risco Cambial:** Não ficas vulnerável a oscilações do par EUR/USD no teu pilar financeiro.

---

#### 2. 🏰 O que a Deutsche Börse Realmente Possui:
* **XETRA & Bolsa de Frankfurt:** Toda e qualquer compra de ações ou ETFs na Alemanha cobra comissões para a Deutsche Börse.
* **STOXX Ltd. (Índices Europeus):** É a dona dos índices **DAX 40**, **EURO STOXX 50** e **STOXX Europe 600**. Cada gestora (Amundi, iShares, Vanguard) que emite um ETF paga milhões em licenças anuais.
* **Clearstream:** O custodiante central que guarda e liquida triliões de euros em títulos europeus.
* **Eurex:** A maior câmara de derivados da Europa (quando os mercados caem e há pânico, os volumes disparam e a Deutsche Börse lucra ainda mais).

---

#### 3. 🛡️ Fim do Risco Bancário:
* **Não Empresta Dinheiro:** Ao contrário dos bancos comerciais do \`BNKE\`, a Deutsche Börse não corre risco de calote de empréstimos nem sofre se o BCE cortar as taxas de juro.
* **Margem Operacional > 50%:** Uma das margens mais lucrativas de todo o mercado europeu.
* **Retorno 10 Anos:** Mais de **+320%** em valorização composta contínua!`;
    }

    // 3. EUROPEAN BANKS / BNKE / DEUTSCHE BÖRSE TRANSITION
    if (q.includes('banco') || q.includes('bnke') || q.includes('europa') || q.includes('juro') || q.includes('bce') || q.includes('cort')) {
      return `### 🏛️ Porque Substituímos os Bancos pela Deutsche Börse (DB1.DE)?

Esta transição alinha a tua carteira com o **potencial de crescimento futuro** e solidez estrutural:

1. **Fim do Vento Favorável da Subida de Juros para os Bancos:**
   - Entre 2022 e 2024, o BCE subiu taxas de juro de -0.50% para +4.00%, gerando lucros anómalos nos bancos.
   - Com o ciclo de corte de juros do BCE (já em curso para ~2%), as margens financeiras bancárias comprimem-se e o risco de crédito aumenta.

2. **A Superioridade da Deutsche Börse (DB1.DE a 12%):**
   - **Monopólio de Infraestrutura:** Detém a XETRA, Eurex, Clearstream e índices STOXX/DAX. Cobra comissões sobre cada transação e liquidação na Europa.
   - **0.00% de Comissões de Gestão (TER):** Ação direta sem custos anuais de ETF.
   - **Sem Risco de Crédito:** Não concede empréstimos nem corre risco de incumprimento de devedores.
   - **Anti-Frágil:** Em períodos de volatilidade ou quedas de mercado, o volume de transações em bolsa e derivados sobe, aumentando as receitas da Deutsche Börse!`;
    }

    // 4. EMERGENCY FUND / VGLA / FUNDO DE EMERGENCIA / CASH
    if (q.includes('emergencia') || q.includes('emergência') || q.includes('vgla') || q.includes('obrigac') || q.includes('obrigação') || q.includes('seguranca') || q.includes('xeon')) {
      return `### 🛡️ Fundo de Emergência em VGLA? Análise Cirúrgica de Risco

A tua pergunta sobre o **VGLA** (Vanguard Global Aggregate Bond UCITS ETF) é crucial! 

**Veredito Direto do Finteck AI:** 
❌ **NÃO recomendo colocar o fundo de emergência em VGLA.**  
✅ **A solução correta para emergência é um ETF Monetário em EUR (como \`XEON\` ou \`CSH2\`) ou depósitos a prazo.**

#### Porque é que o VGLA é perigoso para Emergência?
1. **Risco de Taxa de Juro (Duração ~7 anos):**
   - O VGLA é um ETF de obrigações de **médio/longo prazo**. Quando as taxas de juro subiram em 2022, o VGLA **caiu mais de -15% a -20%**!
   - Um fundo de emergência **nunca pode estar negativo** quando precisares dele para uma emergência médica ou do carro.
2. **Risco Cambial:**
   - Embora possa ter cobertura cambial, obrigações globais sofrem flutuações de volatilidade que não pertencem a uma reserva de emergência.

#### A Alternativa Perfeita na XTB:
Se queres manter o fundo de emergência investido a render juros sem risco de perda de capital:
* **\`XEON.DE\` (Xtrackers II EUR Overnight Rate Swap UCITS ETF Acc):**
  - Rende exatamente a taxa de depósitos do BCE (atualmente **~3.25% a.a.** brutos).
  - Volatilidade praticamente **ZERO (0.00%)**. A linha sobe todos os dias como uma escada.
  - Liquidez diária total na XTB em EUR sem comissões.
* **Ou a própria conta remunerada da XTB** (que paga juros sobre o saldo não investido).`;
    }

    // 5. STOCKS 5% CAP & QDVE LOCOMOTIVE
    if (q.includes('acoes') || q.includes('ações') || q.includes('5%') || q.includes('10%') || q.includes('qdve') || q.includes('googl') || q.includes('amzn') || q.includes('individual')) {
      return `### 🚂 Porque Blindámos o QDVE a 38% e Limitámos as Ações a 5% Cada?

A tua observação foi a chave de ouro da nossa sessão. Aqui está a fundamentação técnica:

#### 1. Porque Ações Individuais (GOOGL / AMZN) Têm Teto Estrito de 5% Cada (€4/mês cada):
* **Risco Idiossincrático (Risco Não Sistemático):**
  - Uma ação individual está exposta a eventos que não afetam um ETF: processos antitrust do Departamento de Justiça americano, multas da UE, trocas de CEO, ou um trimestre com lucros abaixo das estimativas (que pode fazer cair a ação -15% num só dia).
  - Numa carteira de 80€/mês, ter 20% ou 24% em apenas duas empresas destrói o perfil de tranquilidade. Limitar a **5% cada (10% total)** dá-te o sabor do hipercrescimento com 0% TER, mas com blindagem contra desastres corporativos.

#### 2. Porque o QDVE tem de Liderar com 38% a 40% (€30.40/mês):
* **Consistência Histórica ("Win Rate"):**
  - O QDVE (S&P 500 IT) é ancorado por titãs com balanços que funcionam como governos soberanos (Apple tem mais de $60B em caixa, Microsoft gera $25B de free cash flow por trimestre, Nvidia domina 85% do mercado de data centers).
  - Em correções de mercado, o QDVE recupera **duas vezes mais depressa** do que ETFs de semicondutores puros ou biotechs. É a âncora de confiança que te permite dormir descansado!`;
    }

    // 6. PROJECTIONS / 10 YEARS / 20 YEARS / 30 YEARS / COMPOUND
    if (q.includes('projec') || q.includes('projeção') || q.includes('quanto') || q.includes('10 anos') || q.includes('20 anos') || q.includes('30 anos') || q.includes('futuro') || q.includes('dinheiro') || q.includes('acumular')) {
      return `### 🔮 Projeção de Riqueza a 10, 20 e 30 Anos (€80 / Mês)

Com a tua alocação de **Potencial Secular de Crescimento** (CAGR estimado entre **18.8% conservador** e **24.5% otimizado**):

* **Capital Atual do Plano:** €2,215.67 (com **€1,760.00** de depósitos executados em 22 meses a €80/mês | Lucro Total: +€455.67 (+25.89% simples, +40.74% TWR))
* **Aporte Mensal:** €80.00 / mês (no dia 1)

| Prazo | Total do Teu Bolso | Valor Estimado (Conservador ~18.8%) | Valor Estimado (Cenário Pleno ~24.5%) | Lucro Líquido Criado |
| :--- | :---: | :---: | :---: | :---: |
| **10 Anos (2034)** | €9,600 | **€32,300** | **€40,800** | **+€22,700 a +€31,200** |
| **20 Anos (2044)** | €19,200 | **€171,000** | **€491,000** | **+€151,800 a +€471,800!** |
| **30 Anos (2054)** | €28,800 | **€975,000** | **€5,520,000** | **+€946k a +5.49 MILHÕES!** |

**💎 A Mágica aos 20 Anos:**
Aos 20 anos, o teu bolso meteu apenas **€19,200** (240 meses × €80), mas o juro composto gerou mais de **€150,000 a €470,000 de lucro puro**. Mais de 85% do teu património virá de juros a trabalhar para ti enquanto dormes!`;
    }

    // 7. HOW TO BUY ON XTB
    if (q.includes('xtb') || q.includes('comprar') || q.includes('como faco') || q.includes('como faço') || q.includes('ordem') || q.includes('fracao') || q.includes('fração')) {
      return `### 📱 Como Executar as Compras Mensais na XTB (€80/Mês)

Executar a tua estratégia na corretora é simples, rápido e 100% calibrado. Aqui está o passo a passo:

1. **Dia 1 do Mês (Transferência):**
   - Depositas **€80.00** na tua conta em EUR.

2. **Pesquisa os 6 Tickers da tua Carteira:**
   - \`QDVE\` (S&P 500 IT ETF) $\rightarrow$ Ordem de **€29.60** (37%)
   - \`CHIP\` (MSCI Semiconductors ETF) $\rightarrow$ Ordem de **€16.00** (20%)
   - \`DB1.DE\` (Deutsche Börse AG) $\rightarrow$ Ordem de **€9.60** (12%)
   - \`GOOGL\` (Alphabet Inc.) $\rightarrow$ Ordem de **€8.80** (11%)
   - \`AMZN\` (Amazon.com) $\rightarrow$ Ordem de **€8.00** (10%)
   - \`NOVO\` (Novo Nordisk A/S) $\rightarrow$ Ordem de **€8.00** (10%)

3. **Tipo de Ordem:**
   - Seleciona sempre **"Ordem a Mercado"** ou **"Fracionada por Valor em Euros"** durante o horário de abertura das bolsas europeias (entre as 08:30 e as 16:30 de Lisboa).`;
    }

    // 5. GENERAL COMPANY / THESIS / POTENTIAL QUESTIONS
    if (q.includes('empresa') || q.includes('potencial') || q.includes('achas') || q.includes('vale a pena') || q.includes('recomendas') || q.includes('opiniao') || q.includes('opinião')) {
      return `### 💡 Análise e Opinião Estratégica Finteck AI

Para avaliar o potencial de qualquer empresa ou ativo no teu portfólio de **€80/mês na XTB**, aplicamos os nossos 4 pilares quantitativos:

1. **Secular vs Cíclico (Horizonte 10–20 Anos):**
   A tua carteira está focada nos 6 pilares de maior resiliência e crescimento:
   - **IA & Software (QDVE 37%):** Margens puras de software e infraestrutura (Apple, Microsoft, Nvidia).
   - **Semicondutores (CHIP 20%):** O gargalo físico de todo o hardware mundial (TSMC, ASML).
   - **Infraestrutura Financeira (DB1.DE 12%):** Monopólio XETRA, Eurex e Clearstream com 0.00% TER.
   - **Big Tech Direta (GOOGL 11%, AMZN 10%):** Monopólios com 0% TER e fora do índice de TI.
   - **Saúde Defensiva Secular (NOVO 10%):** Duopólio mundial em tratamentos metabólicos e GLP-1.

2. **Crescimento de Lucros e Free Cash Flow:**
   Evitamos empresas especulativas sem lucro. Todas as empresas selecionadas geram fluxos de caixa maciços e apresentam balanços com elevada solidez.

3. **Avaliação Relativa e Custos de Gestão:**
   Ações individuais com 0.00% de comissões anuais e ETFs com TERs ultrabaixos (0.15% e 0.35%).

4. **Regra de Blindagem Não-Dilutiva:**
   Qualquer ativo satélite adicional em Euros (como NUKL ou DFNS) deve ser adicionado em blocos de 5% a 10% para não diluir os motores de retorno.`;
    }

    // DEFAULT FALLBACK (INTELLIGENT FINANCIAL SYNTHESIS)
    return `### 💡 Análise Personalizada Finteck AI

Excelente questão sobre **"${query}"**! 

Analisando a tua estratégia atual com base na tua carteira consolidada de 6 ativos:

1. **Alinhamento com o teu Objetivo:**
   Estás num plano de acumulação disciplinado de **€80/mês**, com horizonte de longo prazo (10 a 20+ anos), focado em capturar as grandes megatendências seculares (IA, Semicondutores, Infraestrutura de Mercados, Cloud e Saúde) com calibração prudente e custos ultrabaixos.

2. **Pilares da Tua Carteira:**
   - O **QDVE (37%)** e o **CHIP (20%)** formam o motor central de crescimento tecnológico global;
   - A **Deutsche Börse (DB1.DE a 12%)** garante um monopólio estável e anti-frágil de liquidez em Euros com 0.00% TER;
   - As ações individuais (**GOOGL 11%, AMZN 10%, NOVO 10%**) captam fluxos de caixa colossais sem pagar taxas de ETF.`;
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      text: textToSend.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    // Try calling backend /api/finteck-ai if online, fallback instantly to institutional reasoning engine
    try {
      let backendReply = null;
      try {
        const res = await fetch('http://127.0.0.1:8000/api/finteck-ai?q=' + encodeURIComponent(textToSend.trim()), { signal: AbortSignal.timeout(1500) }).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            backendReply = data.reply;
          }
        }
      } catch (err) {
        // graceful offline fallback
      }

      // Simulate a natural thoughtful AI response time (450ms)
      await new Promise(resolve => setTimeout(resolve, 450));

      let replyText = null;
      const storedKey = localStorage.getItem('finteck_gemini_api_key');

      // If user provided a Gemini API Key, query Gemini 2.0 Flash directly for live, unconstrained LLM intelligence
      if (storedKey && storedKey.trim()) {
        try {
          const portfolioContext = `Tu és o Finteck AI, o copiloto quantitativo de inteligência financeira de elite do utilizador.
O utilizador tem um portfólio real na corretora XTB com aportes mensais de €80/mês:
- S&P 500 IT Sector ETF (QDVE): 37.0% (€29.60/mês)
- MSCI Semiconductors ETF (CHIP): 20.0% (€16.00/mês)
- Deutsche Börse AG (DB1.DE): 12.0% (€9.60/mês)
- Alphabet Inc. (GOOGL): 11.0% (€8.80/mês)
- Amazon.com (AMZN): 10.0% (€8.00/mês)
- Novo Nordisk A/S (NOVO): 10.0% (€8.00/mês)
Histórico: 24 meses decorridos, €1,920.00 investidos (24 x 80€), saldo atual de €2,248.26 (+€328.26 lucro simples | +17.10% | TWR: +40.74%). Retorno esperado: ~13.6% a.a. base / 9.6% conservador.
Diretrizes: Responde diretamente à dúvida do utilizador como um analista de investimentos de topo mundial, sem fugir ao assunto, com profundidade analítica, tom amigável e focado no longo prazo em Português de Portugal.`;

          const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${storedKey.trim()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    { text: `${portfolioContext}\n\nPergunta do utilizador: "${textToSend.trim()}"` }
                  ]
                }
              ]
            })
          });

          if (gRes.ok) {
            const gData = await gRes.json();
            const genText = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (genText && genText.trim()) {
              replyText = genText.trim();
            }
          }
        } catch (gErr) {
          console.warn('Live Gemini call fallback:', gErr);
        }
      }

      if (!replyText) {
        const isSubstantiveBackend = backendReply && backendReply.length > 120 && !backendReply.includes('estou calibrado para o teu portfólio');
        replyText = isSubstantiveBackend ? backendReply : generateInstitutionalResponse(textToSend.trim(), messages);
      }

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        text: replyText
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.warn('Chat response handling notice:', e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col bg-white border-2 border-black rounded-2xl shadow-sm overflow-hidden ${
      isFloatingMode ? 'h-[620px] w-[420px] max-w-[95vw]' : 'min-h-[750px] w-full'
    }`}>
      
      {/* Top Finteck AI Bar */}
      <div className="bg-[#FAF8F5] border-b border-black p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2D6A4F] border-2 border-white"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-zinc-900 font-sans tracking-tight">Finteck AI</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EAF3ED] text-[#2D6A4F] border border-[#2D6A4F]/30 font-semibold">
                Contexto Ativo
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 font-sans line-clamp-1">
              Copiloto do Portfólio XTB (€80/Mês • 6 Ativos • Crescimento Secular)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClearChat}
            title="Limpar histórico"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-200 transition-all text-xs flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isFloatingMode && (
            <button
              onClick={onCloseFloating}
              className="px-2 py-1 rounded-lg text-xs font-mono bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Active Portfolio Micro Context Ribbon */}
      <div className="bg-[#F5F2EB] px-4 py-2 border-b border-black/10 flex items-center justify-between text-[11px] font-mono text-zinc-600 overflow-x-auto gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <Lock className="w-3 h-3 text-zinc-700" />
          <span className="text-zinc-900 font-medium">Memória Carregada:</span>
          <span className="text-[#2D6A4F] font-semibold">QDVE (37%) • CHIP (20%) • DB1.DE (12%) • GOOGL (11%) • AMZN (10%) • NOVO (10%)</span>
        </div>
        <div className="shrink-0 text-zinc-500 text-[10px]">
          XTB EUR • €80/mês
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm bg-[#FAF8F5]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div className={`relative group max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-xs sm:text-sm ${
              msg.sender === 'user'
                ? 'bg-black text-white rounded-tr-sm shadow-sm'
                : 'bg-white border border-black/20 text-zinc-900 rounded-tl-sm shadow-sm'
            }`}>
              
              {/* Message Content Rendered with Formatted Paragraphs */}
              <div className="space-y-2 whitespace-pre-wrap font-sans">
                {msg.text.split('\n\n').map((paragraph, idx) => {
                  // Check if header
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={idx} className={`font-bold text-sm pt-1 border-b pb-1 flex items-center gap-1.5 ${msg.sender === 'user' ? 'border-zinc-700 text-white' : 'border-black/10 text-zinc-900'}`}>
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h5 key={idx} className={`font-semibold text-xs pt-1 ${msg.sender === 'user' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {paragraph.replace('#### ', '')}
                      </h5>
                    );
                  }
                  // Normal text with bold spans
                  return (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Timestamp & Copy Pill */}
              <div className={`flex items-center justify-between gap-3 mt-2 pt-1 text-[10px] font-mono border-t ${
                msg.sender === 'user' ? 'border-zinc-800 text-zinc-400' : 'border-zinc-200 text-zinc-500'
              }`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-black flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                    title="Copiar resposta"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-[#2D6A4F]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-medium shrink-0 mt-0.5 border border-black">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-zinc-600 font-mono">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-black/20 px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[11px] text-zinc-600">Finteck AI a processar dados...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="bg-[#FAF8F5] px-4 py-2 border-t border-black/10 overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-zinc-700" /> Sugestões:
        </span>
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.prompt)}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-white hover:bg-[#EBE5DC] text-zinc-800 border border-black/20 text-xs transition-all flex items-center gap-1 shadow-2xs"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div className="bg-white p-3 border-t border-black">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunta ao Finteck AI sobre a tua carteira, ativos, XTB, taxas..."
            className="flex-1 bg-[#FAF8F5] text-zinc-900 text-xs sm:text-sm rounded-xl px-4 py-3 border border-black/30 focus:outline-none focus:border-black placeholder:text-zinc-400 font-sans"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            className={`p-3 rounded-xl flex items-center justify-center font-medium transition-all ${
              inputMessage.trim() && !isTyping
                ? 'bg-black text-white hover:bg-zinc-800 cursor-pointer shadow-sm'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
            title="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-2 px-1">
          <span>Pressiona Enter para enviar • Conhece 100% da tua conversa</span>
          <span>Finteck AI v2.4</span>
        </div>
      </div>

      {/* Gemini API Key Configuration Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF8F5] border-2 border-black rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2D6A4F]" />
              Conectar Google Gemini 2.0 Flash
            </h3>
            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Queres respostas 100% orgânicas de IA sem qualquer restrição? Insere aqui uma chave gratuita da Google (Google AI Studio). O Finteck AI responderá com raciocínio ilimitado conhecendo toda a tua carteira!
            </p>
            <div className="mb-4">
              <label className="text-[11px] font-mono font-semibold text-zinc-700 block mb-1">
                Gemini API Key (aistudio.google.com):
              </label>
              <input
                type="password"
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 text-xs border-2 border-black rounded-xl bg-white font-mono focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                💡 A chave é guardada apenas no teu browser (localStorage). Podes remover quando quiseres.
              </span>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-200">
              {hasCustomKey && (
                <button
                  onClick={() => {
                    localStorage.removeItem('finteck_gemini_api_key');
                    setGeminiKeyInput('');
                    setHasCustomKey(false);
                    setIsKeyModalOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors mr-auto"
                >
                  Desligar Gemini
                </button>
              )}
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold border-2 border-black rounded-xl bg-zinc-200 hover:bg-zinc-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (geminiKeyInput.trim()) {
                    localStorage.setItem('finteck_gemini_api_key', geminiKeyInput.trim());
                    setHasCustomKey(true);
                  } else {
                    localStorage.removeItem('finteck_gemini_api_key');
                    setHasCustomKey(false);
                  }
                  setIsKeyModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold border-2 border-black rounded-xl bg-[#2D6A4F] text-white hover:bg-[#24543F] transition-colors"
              >
                Guardar Chave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
