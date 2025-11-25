# 🛠️ ChainGotchi Setup Guide

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Compilation](#compilation)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Verification](#verification)
8. [Frontend Setup](#frontend-setup)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **Git**
- **MetaMask** or compatible Web3 wallet

### Recommended
- **VSCode** with Solidity extension
- **Hardhat** extension for VSCode

### Check versions:
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Gzeu/ChainGotchi.git
cd ChainGotchi
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Hardhat development environment
- OpenZeppelin contracts
- TypeScript support
- Testing libraries
- Ethers.js v6

### 3. Verify Installation

```bash
npx hardhat
```

You should see Hardhat's help menu.

---

## Configuration

### 1. Create Environment File

```bash
cp .env.example .env
```

### 2. Configure `.env`

Open `.env` and add:

```bash
# Wallet Private Key (NEVER commit this!)
PRIVATE_KEY=your_private_key_without_0x_prefix

# BSCScan API Key (for contract verification)
BSCSCAN_API_KEY=your_bscscan_api_key

# Optional: Custom RPC URLs
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
BSC_MAINNET_RPC=https://bsc-dataseed.binance.org/
```

### 3. Get Your Private Key

**MetaMask:**
1. Open MetaMask
2. Click account icon → Account Details
3. Click "Show private key"
4. Enter password
5. Copy key (remove "0x" prefix)

⚠️ **SECURITY WARNING:** Never share or commit your private key!

### 4. Get BSCScan API Key

1. Go to https://bscscan.com
2. Register account
3. API Keys → Add
4. Copy API key

### 5. Get Testnet BNB

**BSC Testnet Faucet:**
1. Visit https://www.bnbchain.org/en/testnet-faucet
2. Connect wallet
3. Request tBNB (0.5 BNB daily)
4. Wait 1-2 minutes

Alternative faucets:
- https://testnet.bnbchain.org/faucet-smart
- https://testnet.binance.org/faucet-smart

---

## Compilation

### Compile Contracts

```bash
npm run compile
```

Or:

```bash
npx hardhat compile
```

**Expected Output:**
```
Compiling 10 files with 0.8.20
Compilation finished successfully
```

### Clean Build

If you encounter issues:

```bash
npx hardhat clean
npm run compile
```

---

## Testing

### Run All Tests

```bash
npm test
```

Or:

```bash
npx hardhat test
```

### Run Specific Test

```bash
npx hardhat test test/ChainGotchi.test.ts
```

### Run Tests with Coverage

```bash
npx hardhat coverage
```

### Expected Test Results

```
  ChainGotchi
    Minting
      ✓ Should mint a pet with correct payment
      ✓ Should reject minting without payment
      ✓ Should reject invalid names
    Feeding
      ✓ Should feed pet and restore hunger
      ✓ Should not allow non-owner to feed
      ✓ Should respect feed cooldown
    Playing
      ✓ Should gain XP from playing
      ✓ Should respect play cooldown
    Leveling
      ✓ Should level up after gaining enough XP
      ✓ Should evolve at correct levels
    Death
      ✓ Should die when hunger reaches 0
      ✓ Should not allow interactions with dead pet
    Battles
      ✓ Should create a battle
      ✓ Should join and complete a battle
      ✓ Should not allow low level pets to battle
    Ownership
      ✓ Should withdraw contract balance

  16 passing (5s)
```

---

## Deployment

### 1. Deploy to BSC Testnet

**Make sure you have:**
- Private key in `.env`
- Testnet BNB in wallet (at least 0.1 BNB)

**Deploy:**

```bash
npm run deploy:testnet
```

Or:

```bash
npx hardhat run scripts/deploy.ts --network bscTestnet
```

**Expected Output:**

```
🚀 Starting ChainGotchi deployment...

📝 Deploying contracts with account: 0x...
💰 Account balance: 0.5 BNB

🐣 Deploying ChainGotchiNFT...
✅ ChainGotchiNFT deployed to: 0x...

⚔️  Deploying BattleArena...
✅ BattleArena deployed to: 0x...

🔗 Setting BattleArena address in NFT contract...
✅ BattleArena address set!

📄 Deployment info saved to deployments.json

============================================================
🎉 DEPLOYMENT COMPLETE!
============================================================

📋 Contract Addresses:
   ChainGotchiNFT: 0x...
   BattleArena: 0x...

🔍 Verify contracts with:
   npx hardhat verify --network bscTestnet 0x...
   npx hardhat verify --network bscTestnet 0x... 0x...

============================================================
```

### 2. Save Contract Addresses

Addresses are automatically saved to `deployments.json`:

```json
{
  "97": {
    "network": "bscTestnet",
    "chainId": "97",
    "deployer": "0x...",
    "contracts": {
      "ChainGotchiNFT": "0x...",
      "BattleArena": "0x..."
    },
    "timestamp": "2025-11-25T..."
  }
}
```

### 3. Test Deployment

Visit testnet BscScan:
```
https://testnet.bscscan.com/address/YOUR_NFT_CONTRACT_ADDRESS
```

You should see:
- Contract creation transaction
- Contract code (not verified yet)
- Balance: 0 BNB

---

## Verification

### Why Verify?

- Users can read contract source code
- Direct interaction via BscScan UI
- Transparency and trust
- Green checkmark on BscScan

### Verify ChainGotchiNFT

```bash
npx hardhat verify --network bscTestnet YOUR_NFT_CONTRACT_ADDRESS
```

### Verify BattleArena

```bash
npx hardhat verify --network bscTestnet YOUR_BATTLE_CONTRACT_ADDRESS YOUR_NFT_CONTRACT_ADDRESS
```

**Note:** BattleArena requires constructor argument (NFT address)

### Expected Output

```
Successfully verified contract ChainGotchiNFT on BscScan.
https://testnet.bscscan.com/address/0x...#code
```

### Troubleshooting Verification

**Error: Already verified**
- Contract is already verified, skip this step

**Error: Compilation mismatch**
- Make sure you compiled with same settings
- Run `npx hardhat clean` and recompile
- Verify using exact bytecode

**Error: Invalid API key**
- Check BSCSCAN_API_KEY in `.env`
- Generate new key on BscScan

---

## Frontend Setup

**Coming in Phase 3!**

The frontend will be built with:
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- wagmi + ethers.js
- RainbowKit

Stay tuned for frontend setup guide.

---

## Troubleshooting

### Common Issues

#### Issue: "Insufficient funds"

**Solution:**
- Get testnet BNB from faucet
- Check wallet balance: https://testnet.bscscan.com/address/YOUR_ADDRESS
- Make sure you have at least 0.1 BNB

#### Issue: "Nonce too high"

**Solution:**
```bash
# Reset account in MetaMask:
# Settings → Advanced → Clear activity tab data
```

#### Issue: "Transaction underpriced"

**Solution:**
- Increase gas price in `hardhat.config.ts`:
```typescript
gasPrice: 20000000000, // 20 gwei instead of 10
```

#### Issue: Compilation errors

**Solution:**
```bash
npx hardhat clean
rm -rf node_modules
npm install
npm run compile
```

#### Issue: "Cannot find module"

**Solution:**
```bash
npm install
npx hardhat compile
```

#### Issue: Tests failing

**Solution:**
- Make sure contracts are compiled
- Check if you modified contract logic
- Run tests individually to isolate issue

### Getting Help

**Resources:**
- [Hardhat Docs](https://hardhat.org/docs)
- [OpenZeppelin Docs](https://docs.openzeppelin.com)
- [BNB Chain Docs](https://docs.bnbchain.org)
- [Ethers.js Docs](https://docs.ethers.org)

**Community:**
- GitHub Issues: https://github.com/Gzeu/ChainGotchi/issues
- Discord: Coming soon
- Twitter: Coming soon

---

## Next Steps

✅ **You've completed:**
- Project setup
- Contract compilation
- Testing
- Testnet deployment
- Contract verification

🚀 **What's next:**

1. **Test on BscScan:**
   - Mint a pet via contract interface
   - Feed and play with pet
   - Create a battle

2. **Build Frontend:**
   - Follow Phase 3 instructions
   - Connect wallet
   - Create UI for pet interactions

3. **Advanced Features:**
   - Add marketplace
   - Implement breeding
   - Create tournaments

4. **Mainnet Launch:**
   - Security audit
   - Deploy to mainnet
   - Marketing campaign

---

**Ready to build the frontend?** Check out the Phase 3 guide coming next!
