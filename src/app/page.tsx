"use client";

import { useState } from "react";
import { Player } from "@/types";
import { AGENTS } from "@/data/agents";
import PartyList from "@/components/PartyList";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Player 1",
      result: "?",
      excluded: new Set<string>(),
      isSettingsOpen: false,
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const addPlayer = () => {
    if (players.length >= 5) return;
    setPlayers([
      ...players,
      {
        id: nextId,
        name: `Player ${players.length + 1}`,
        result: "?",
        excluded: new Set<string>(),
        isSettingsOpen: false,
      },
    ]);
    setNextId(nextId + 1);
  };

  const removePlayer = (id: number) => {
    if (players.length <= 1) return;
    setPlayers(players.filter((p) => p.id !== id));
  };

  const updatePlayerName = (id: number, name: string) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const updatePlayerExclusion = (id: number, excluded: Set<string>) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, excluded } : p))
    );
  };

  const pickAll = () => {
    const takenAgents = new Set<string>();

    // Reset results for animation effect (simple version)
    setPlayers(players.map(p => ({ ...p, result: "..." })));

    setTimeout(() => {
      const newPlayers = players.map(player => {
        const available = AGENTS.filter(agent =>
          !player.excluded.has(agent.name) && !takenAgents.has(agent.name)
        );

        let result = "No Agent";
        if (available.length > 0) {
          const picked = available[Math.floor(Math.random() * available.length)];
          result = picked.name;
          takenAgents.add(picked.name);
        }
        return { ...player, result };
      });
      setPlayers(newPlayers);
    }, 300);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center uppercase tracking-wider">
        VALORANT<br /><span className="text-accent">Random Picker</span>
      </h1>

      <PartyList
        players={players}
        onNameChange={updatePlayerName}
        onRemove={removePlayer}
        onUpdateExclusion={updatePlayerExclusion}
      />

      {/* Controls */}
      <div className="flex gap-4 w-full justify-center flex-wrap-reverse md:flex-nowrap">
        <button
          onClick={addPlayer}
          disabled={players.length >= 5}
          className="bg-card border border-card-border text-text-secondary px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:border-text hover:text-text disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>+</span> Add Player
        </button>
        <button
          onClick={pickAll}
          className="px-10 py-3 text-xl font-bold uppercase text-text bg-accent rounded-lg shadow-[0_4px_12px_rgba(255,70,85,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,70,85,0.3)]"
        >
          PICK ALL
        </button>
      </div>

      {/* Sponsor */}
      <div className="w-full max-w-[400px] mt-10">
        <div className="w-full h-[100px] bg-card border border-dashed border-card-border rounded-lg flex justify-center items-center text-text-secondary text-sm">
          広告枠
        </div>
      </div>
    </main>
  );
}
