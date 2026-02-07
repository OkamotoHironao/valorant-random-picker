export type Role = 'Duelist' | 'Controller' | 'Initiator' | 'Sentinel';

export interface Agent {
    name: string;
    role: Role;
}

export interface Player {
    id: number;
    name: string;
    result: string;
    excluded: Set<string>; // Set of agent names
    isSettingsOpen: boolean;
}
