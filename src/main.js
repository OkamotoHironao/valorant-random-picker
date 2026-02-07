/**
 * VALORANT Random Picker - Main Logic
 * MVP ver3: パーティモード（最大5人・重複なし・個別除外）
 */

(function () {
    'use strict';

    // State
    let players = []; // { id: number, name: string, result: string, excluded: Set<string> }
    let nextPlayerId = 1;

    // Components
    const partyListEl = document.getElementById('partyList');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const pickAllBtn = document.getElementById('pickAllBtn');

    /**
     * 初期化
     */
    function init() {
        addPlayer(); // 最初の一人を追加
        setupGlobalListeners();
    }

    function setupGlobalListeners() {
        addPlayerBtn.addEventListener('click', () => addPlayer());
        pickAllBtn.addEventListener('click', pickAll);
    }

    /**
     * プレイヤー追加
     */
    /**
     * プレイヤー追加
     */
    function addPlayer() {
        if (players.length >= 5) {
            return;
        }

        const player = {
            id: nextPlayerId++,
            name: `Player ${players.length + 1}`,
            result: '?',
            excluded: new Set(),
            isSettingsOpen: false
        };

        players.push(player);
        renderParty();
    }

    /**
     * プレイヤー削除
     */
    function removePlayer(id) {
        if (players.length <= 1) return; // 最低1人は残す
        players = players.filter(p => p.id !== id);
        renderParty();
    }

    /**
     * パーティ全体を描画
     */
    function renderParty() {
        partyListEl.innerHTML = '';
        players.forEach(player => {
            const card = createPlayerCard(player);
            partyListEl.appendChild(card);
        });

        // 5人の場合は追加ボタンを無効化
        addPlayerBtn.disabled = players.length >= 5;
        addPlayerBtn.style.opacity = players.length >= 5 ? 0.5 : 1;
        addPlayerBtn.style.cursor = players.length >= 5 ? 'not-allowed' : 'pointer';
    }

    /**
     * プレイヤーカードDOM生成
     */
    function createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card';

        // Header
        const header = document.createElement('div');
        header.className = 'card-header';

        const nameInput = document.createElement('input');
        nameInput.className = 'player-name-input';
        nameInput.value = player.name;
        nameInput.onchange = (e) => { player.name = e.target.value; };

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = () => removePlayer(player.id);
        if (players.length === 1) removeBtn.style.display = 'none';

        header.appendChild(nameInput);
        header.appendChild(removeBtn);

        // Result
        const resultDiv = document.createElement('div');
        resultDiv.className = 'card-result';
        resultDiv.innerHTML = `<span class="result-text">${player.result}</span>`;

        // Settings Toggle
        const settingsToggle = document.createElement('button');
        settingsToggle.className = 'settings-toggle';
        const excludedCount = player.excluded.size;
        settingsToggle.innerHTML = `除外設定 ${excludedCount > 0 ? `(${excludedCount})` : ''} ▼`;

        const exclusionPanel = document.createElement('div');
        exclusionPanel.className = 'exclusion-panel';
        exclusionPanel.hidden = !player.isSettingsOpen;

        settingsToggle.onclick = () => {
            player.isSettingsOpen = !player.isSettingsOpen;
            exclusionPanel.hidden = !player.isSettingsOpen;
        };

        // Role Filters
        const roleActions = document.createElement('div');
        roleActions.className = 'role-actions';

        // Reset Button
        const resetBtn = document.createElement('button');
        resetBtn.className = 'role-btn';
        resetBtn.textContent = 'Reset';
        resetBtn.onclick = () => {
            player.excluded.clear();
            renderParty(); // 再描画で反映
        };
        roleActions.appendChild(resetBtn);

        // Role Buttons
        ['Duelist', 'Initiator', 'Controller', 'Sentinel'].forEach(role => {
            const btn = document.createElement('button');
            btn.className = 'role-btn';
            btn.textContent = `${role} NG`;
            btn.onclick = () => {
                AGENTS.filter(a => a.role === role).forEach(a => player.excluded.add(a.name));
                renderParty();
            };
            roleActions.appendChild(btn);
        });

        // Agent Grid (Mini)
        const agentGrid = document.createElement('div');
        agentGrid.className = 'agent-grid-mini';

        AGENTS.forEach(agent => {
            const chip = document.createElement('div');
            chip.className = `agent-chip ${player.excluded.has(agent.name) ? 'excluded' : ''}`;
            chip.textContent = agent.name;
            chip.onclick = () => {
                if (player.excluded.has(agent.name)) {
                    player.excluded.delete(agent.name);
                } else {
                    player.excluded.add(agent.name);
                }
                renderParty();
            };
            agentGrid.appendChild(chip);
        });

        exclusionPanel.appendChild(roleActions);
        exclusionPanel.appendChild(agentGrid);

        card.appendChild(header);
        card.appendChild(resultDiv);
        card.appendChild(settingsToggle);
        card.appendChild(exclusionPanel);

        return card;
    }

    /**
     * 一括抽選
     */
    function pickAll() {
        // 抽選済みエージェント（重複回避用）
        const takenAgents = new Set();

        // アニメーション用リセット
        players.forEach(p => {
            p.result = '...';
        });
        renderParty();

        setTimeout(() => {
            players.forEach(player => {
                // 利用可能なエージェント: 「全体の除外設定」かつ「他の人がまだ選んでいない」
                const available = AGENTS.filter(agent =>
                    !player.excluded.has(agent.name) && !takenAgents.has(agent.name)
                );

                if (available.length === 0) {
                    player.result = 'No Agent';
                } else {
                    const picked = available[Math.floor(Math.random() * available.length)];
                    player.result = picked.name;
                    takenAgents.add(picked.name);
                }
            });
            renderParty();
        }, 300); // 演出用ウェイト
    }

    // Start
    init();
})();
