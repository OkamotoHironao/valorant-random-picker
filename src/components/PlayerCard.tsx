import React, { useState } from 'react';
import { Player, Agent, Role } from '@/types';
import { AGENTS, ROLES } from '@/data/agents';

interface PlayerCardProps {
    player: Player;
    onNameChange: (id: number, name: string) => void;
    onRemove: (id: number) => void;
    onUpdateExclusion: (id: number, excluded: Set<string>) => void;
    canRemove: boolean;
}

export default function PlayerCard({
    player,
    onNameChange,
    onRemove,
    onUpdateExclusion,
    canRemove,
}: PlayerCardProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleExclusion = (agentName: string) => {
        const newExcluded = new Set(player.excluded);
        if (newExcluded.has(agentName)) {
            newExcluded.delete(agentName);
        } else {
            newExcluded.add(agentName);
        }
        onUpdateExclusion(player.id, newExcluded);
    };

    const toggleRoleExclusion = (role: Role) => {
        const agentsInRole = AGENTS.filter((a) => a.role === role);
        const newExcluded = new Set(player.excluded);

        // Check if all agents in this role are already excluded
        const allExcluded = agentsInRole.every((a) => newExcluded.has(a.name));

        if (allExcluded) {
            // Un-exclude all
            agentsInRole.forEach((a) => newExcluded.delete(a.name));
        } else {
            // Exclude all
            agentsInRole.forEach((a) => newExcluded.add(a.name));
        }
        onUpdateExclusion(player.id, newExcluded);
    };

    const resetExclusion = () => {
        onUpdateExclusion(player.id, new Set());
    };

    return (
        <div className="bg-card border border-card-border rounded-xl p-4 w-full max-w-[340px] flex flex-col gap-4 relative">
            {/* Header */}
            <div className="flex justify-between items-center text-text">
                <input
                    type="text"
                    value={player.name}
                    onChange={(e) => onNameChange(player.id, e.target.value)}
                    className="bg-transparent border-b border-dashed border-text-secondary text-text text-sm p-1 w-[140px] transition-all hover:border-accent hover:bg-white/5 focus:outline-none focus:border-solid focus:border-accent focus:bg-white/10"
                />
                {canRemove && (
                    <button
                        onClick={() => onRemove(player.id)}
                        className="text-text-secondary hover:text-accent text-xl px-2"
                    >
                        &times;
                    </button>
                )}
            </div>

            {/* Result */}
            <div className="h-[60px] flex justify-center items-center bg-primary rounded-lg">
                <span className="text-2xl font-bold text-text">{player.result}</span>
            </div>

            {/* Settings Toggle */}
            <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="w-full text-text-secondary text-xs hover:text-text flex justify-center items-center gap-1"
            >
                除外設定 {player.excluded.size > 0 && `(${player.excluded.size})`} ▼
            </button>

            {/* Exclusion Panel */}
            {isSettingsOpen && (
                <div className="flex flex-col gap-3 mt-1">
                    {/* Role Actions */}
                    <div className="flex flex-wrap gap-1 justify-center">
                        <button
                            onClick={resetExclusion}
                            className="text-[10px] px-2 py-1 bg-card-border rounded text-text-secondary hover:border-text-secondary border border-transparent"
                        >
                            Reset
                        </button>
                        {ROLES.map((role) => (
                            <button
                                key={role}
                                onClick={() => toggleRoleExclusion(role)}
                                className="text-[10px] px-2 py-1 bg-card-border rounded text-text-secondary hover:border-text-secondary border border-transparent"
                            >
                                {role} NG
                            </button>
                        ))}
                    </div>

                    {/* Agent Grid */}
                    <div className="grid grid-cols-4 gap-1">
                        {AGENTS.map((agent) => {
                            const isExcluded = player.excluded.has(agent.name);
                            return (
                                <button
                                    key={agent.name}
                                    onClick={() => toggleExclusion(agent.name)}
                                    className={`text-[10px] p-1 rounded border border-transparent text-center transition-colors
                    ${isExcluded
                                            ? 'bg-[#2a0000] opacity-30 line-through text-text-secondary'
                                            : 'bg-card-border text-text-secondary hover:text-text hover:border-text-secondary'
                                        }`}
                                >
                                    {agent.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
