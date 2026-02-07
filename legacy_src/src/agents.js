/**
 * VALORANT Agent Data
 * MVP ver3: ロール情報付きオブジェクト配列
 */
const AGENTS = [
  // Duelist (8)
  { name: "Jett", role: "Duelist" },
  { name: "Phoenix", role: "Duelist" },
  { name: "Reyna", role: "Duelist" },
  { name: "Raze", role: "Duelist" },
  { name: "Yoru", role: "Duelist" },
  { name: "Neon", role: "Duelist" },
  { name: "Iso", role: "Duelist" },
  { name: "Waylay", role: "Duelist" },

  // Controller (7)
  { name: "Brimstone", role: "Controller" },
  { name: "Omen", role: "Controller" },
  { name: "Viper", role: "Controller" },
  { name: "Astra", role: "Controller" },
  { name: "Harbor", role: "Controller" },
  { name: "Clove", role: "Controller" },

  // Initiator (7)
  { name: "Sova", role: "Initiator" },
  { name: "Breach", role: "Initiator" },
  { name: "Skye", role: "Initiator" },
  { name: "KAY/O", role: "Initiator" },
  { name: "Fade", role: "Initiator" },
  { name: "Gekko", role: "Initiator" },
  { name: "Tejo", role: "Initiator" },

  // Sentinel (7)
  { name: "Sage", role: "Sentinel" },
  { name: "Cypher", role: "Sentinel" },
  { name: "Killjoy", role: "Sentinel" },
  { name: "Chamber", role: "Sentinel" },
  { name: "Deadlock", role: "Sentinel" },
  { name: "Vyse", role: "Sentinel" },
  { name: "Veto", role: "Sentinel" },
];

// ロール定数
const ROLES = ["Duelist", "Controller", "Initiator", "Sentinel"];
