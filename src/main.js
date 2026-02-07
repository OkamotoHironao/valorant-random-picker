/**
 * VALORANT Random Picker - Main Logic
 * MVP ver2: 除外指定 & 簡易履歴
 */

(function () {
    'use strict';

    // Elements
    const pickBtn = document.getElementById('pickBtn');
    const resultEl = document.getElementById('result');
    const historyEl = document.getElementById('history');
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const agentGrid = document.getElementById('agentGrid');
    const exclusionCountEl = document.getElementById('exclusionCount');

    // State
    const excludedAgents = new Set();
    const pickHistory = [];
    const MAX_HISTORY = 5;

    /**
     * 初期化
     */
    function init() {
        renderAgentGrid();
        updateExclusionCount();
        setupEventListeners();
    }

    /**
     * イベントリスナー設定
     */
    function setupEventListeners() {
        pickBtn.addEventListener('click', handlePick);
        settingsToggle.addEventListener('click', () => {
            settingsPanel.hidden = !settingsPanel.hidden;
        });
    }

    /**
     * エージェントグリッド生成
     */
    function renderAgentGrid() {
        agentGrid.innerHTML = '';
        AGENTS.forEach(agent => {
            const btn = document.createElement('button');
            btn.className = 'agent-btn';
            btn.textContent = agent;
            btn.onclick = () => toggleExclusion(agent, btn);
            agentGrid.appendChild(btn);
        });
    }

    /**
     * 除外状態の切り替え
     */
    function toggleExclusion(agent, btn) {
        if (excludedAgents.has(agent)) {
            excludedAgents.delete(agent);
            btn.classList.remove('excluded');
        } else {
            excludedAgents.add(agent);
            btn.classList.add('excluded');
        }
        updateExclusionCount();
    }

    /**
     * 除外数表示の更新
     */
    function updateExclusionCount() {
        const count = excludedAgents.size;
        exclusionCountEl.textContent = count > 0 ? `(${count})` : '';
    }

    /**
     * ランダムピック実行
     */
    function handlePick() {
        // 除外されていないエージェントのリスト作成
        const availableAgents = AGENTS.filter(a => !excludedAgents.has(a));

        if (availableAgents.length === 0) {
            alert('全てのエージェントが除外されています');
            return;
        }

        // ランダム選択
        const index = Math.floor(Math.random() * availableAgents.length);
        const agent = availableAgents[index];

        displayResult(agent);
        addToHistory(agent);
    }

    /**
     * 結果表示
     */
    function displayResult(agent) {
        resultEl.innerHTML = `<span class="result-agent">${agent}</span>`;
    }

    /**
     * 履歴追加
     */
    function addToHistory(agent) {
        pickHistory.unshift(agent);
        if (pickHistory.length > MAX_HISTORY) {
            pickHistory.pop();
        }
        renderHistory();
    }

    /**
     * 履歴描画
     */
    function renderHistory() {
        historyEl.innerHTML = pickHistory
            .map(agent => `<span class="history-item">${agent}</span>`)
            .join('');
    }

    // Start
    init();
})();
