import { Player } from '@/types';
import PlayerCard from './PlayerCard';

interface PartyListProps {
    players: Player[];
    onNameChange: (id: number, name: string) => void;
    onRemove: (id: number) => void;
    onUpdateExclusion: (id: number, excluded: Set<string>) => void;
}

export default function PartyList({
    players,
    onNameChange,
    onRemove,
    onUpdateExclusion,
}: PartyListProps) {
    return (
        <div className="flex flex-wrap gap-4 justify-center w-full">
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    player={player}
                    onNameChange={onNameChange}
                    onRemove={onRemove}
                    onUpdateExclusion={onUpdateExclusion}
                    canRemove={players.length > 1}
                />
            ))}
        </div>
    );
}
