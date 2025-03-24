
import { BatToken } from '@/components/ParasiteBat/walletTypes';

// Default token data
export const batTokensData: BatToken[] = [
  {
    id: "token-1",
    name: "Quantum Bit",
    value: 450,
    icon: "🔮",
    type: "quantum",
    source: "Quantum entanglement harvesting",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    amount: 450,
    description: "Harvested from quantum fluctuations"
  },
  {
    id: "token-2",
    name: "Neural Credit",
    value: 320,
    icon: "🧠",
    type: "neural",
    source: "Neural network training",
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    amount: 320,
    description: "Generated from successful learning cycles"
  },
  {
    id: "token-3",
    name: "Parasitic Data",
    value: 180,
    icon: "🦠",
    type: "data",
    source: "Information exfiltration",
    timestamp: Date.now() - 1000 * 60 * 30,
    amount: 180,
    description: "Acquired through passive data collection"
  }
];

export default batTokensData;
