# 🎨 ChainGotchi Frontend Structure

## Phase 3: Next.js Frontend Setup

1. Initialize Next.js 15 project with `npx create-next-app@latest frontend --typescript --tailwind --app`
2. Install dependencies:
   - wagmi, viem: Blockchain interaction
   - @rainbow-me/rainbowkit: Wallet connection
   - @tanstack/react-query: Data management
   - framer-motion, react-hot-toast: UI/UX enhancements
3. Create directory structure:
```
frontend/
├── app/
│   ├── page.tsx
│   ├── mint/page.tsx
│   ├── pets/page.tsx
│   └── battle/page.tsx
├── components/
│   ├── PetCard.tsx
│   ├── FeedButton.tsx
│   └── BattleCard.tsx
├── hooks/
│   ├── useChainGotchi.ts
│   └── useBattle.ts
└── lib/
    ├── contracts.ts
    └── wagmi.ts
```
4. Configure wagmi and RainbowKit for wallet connection
5. Implement minting flow (app/mint/page.tsx)
6. Display user's pets and stats (app/pets/page.tsx, PetCard.tsx)
7. Implement battle arena interface (app/battle/page.tsx, BattleCard.tsx)
8. Add UI animations (framer-motion), loading states, notifications
