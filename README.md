# 🐣 ChainGotchi

**BNB Chain Tamagotchi** - Evolving NFT pets with XP system, daily rewards, battles, and breeding mechanics.

![ChainGotchi Banner](https://via.placeholder.com/1200x300/6366f1/ffffff?text=ChainGotchi+-+BNB+Chain+NFT+Pets)

## ✨ Features

- 🎮 **NFT Pets**: Mint unique evolving pets as ERC721 NFTs
- ⚡ **XP System**: Earn experience through daily activities
- 🔄 **Evolution**: 5 stages from Egg to Master (levels 1, 5, 15, 30, 50)
- 🍔 **Care System**: Feed and play with your pets to keep them alive
- ⚔️ **PvP Battles**: Battle other players for rewards
- 📊 **Stats Tracking**: Hunger, happiness, wins, losses
- 💀 **Permadeath**: Pets die if hunger reaches 0
- 🏆 **Leaderboards**: Compete for top rankings

## 🛠️ Tech Stack

**Blockchain:**
- BNB Smart Chain (BSC)
- Solidity ^0.8.20
- OpenZeppelin Contracts
- Hardhat Development Environment

**Frontend:**
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- ethers.js / wagmi
- RainbowKit (wallet connection)

## 📋 Prerequisites

- Node.js v18 or higher
- MetaMask or compatible Web3 wallet
- BNB for gas fees (testnet or mainnet)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Gzeu/ChainGotchi.git
cd ChainGotchi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env with your private key and API keys
```

### 4. Compile contracts

```bash
npm run compile
```

### 5. Run tests

```bash
npm test
```

### 6. Deploy to BSC Testnet

```bash
# Get testnet BNB from: https://www.bnbchain.org/en/testnet-faucet
npm run deploy:testnet
```

### 7. Verify contracts

```bash
npm run verify:testnet -- CONTRACT_ADDRESS
```

## 📖 Game Mechanics

### Evolution Stages

| Stage | Level | Description |
|-------|-------|-------------|
| 🥚 Egg | 1-4 | Newborn pet, learning basics |
| 👶 Baby | 5-14 | Growing and exploring |
| 🧒 Teen | 15-29 | Building strength |
| 💪 Adult | 30-49 | Fully matured |
| 👑 Master | 50+ | Ultimate form |

### XP Earning

- Daily check-in: **10 XP**
- Feed pet: **5 XP**
- Play mini-game: **10-50 XP**
- Win battle: **100 XP**
- Complete quest: **50-200 XP**

### Battle System

**Power Formula:**
```
power = (level × happiness + xp) + random(0-100)
winner = highest power
```

## 📁 Project Structure

```
ChainGotchi/
├── contracts/
│   ├── ChainGotchiNFT.sol      # Main NFT contract
│   ├── BattleArena.sol         # PvP system
│   └── interfaces/
├── scripts/
│   ├── deploy.ts               # Deployment script
│   └── verify.ts               # Verification script
├── test/
│   └── ChainGotchi.test.ts     # Contract tests
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── lib/
├── hardhat.config.ts
└── package.json
```

## 🌐 Networks

### BSC Testnet
- **RPC URL:** https://data-seed-prebsc-1-s1.binance.org:8545/
- **Chain ID:** 97
- **Explorer:** https://testnet.bscscan.com
- **Faucet:** https://www.bnbchain.org/en/testnet-faucet

### BSC Mainnet
- **RPC URL:** https://bsc-dataseed.binance.org/
- **Chain ID:** 56
- **Explorer:** https://bscscan.com

## 🔗 Links

- **Live Demo:** Coming soon
- **Contracts (Testnet):** Coming soon
- **Documentation:** [docs/](./docs/)
- **Discord:** Coming soon
- **Twitter:** Coming soon

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an experimental project. Use at your own risk. Always do your own research.

---

**Built with ❤️ on BNB Chain**
