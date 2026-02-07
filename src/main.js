/**
 * VALORANT Random Picker - Main Logic
 * MVP ver1: ワンクリックランダムピック
 */

(function () {
    'use strict';

    const pickBtn = document.getElementById('pickBtn');
    const resultEl = document.getElementById('result');

    /**
     * ランダムにエージェントを選択
     * @returns {string} エージェント名
     */
    function pickRandomAgent() {
        const index = Math.floor(Math.random() * AGENTS.length);
        return AGENTS[index];
    }

    /**
     * 結果を画面に表示
     * @param {string} agentName 
     */
    function displayResult(agentName) {
        resultEl.innerHTML = `<span class="result-agent">${agentName}</span>`;
    }

    /**
     * ピックボタンのクリックハンドラ
     */
    function handlePick() {
        const agent = pickRandomAgent();
        displayResult(agent);
    }

    // イベントリスナー登録
    pickBtn.addEventListener('click', handlePick);
})();
