# ChainGotchi Frontend Build & Deploy Checklist

## 🛠️ Build/Deploy Prerequisites
- Node.js v18+
- npm v9+
- BSC contracts deployed (contract addresses)
- WalletConnect project ID (https://cloud.walletconnect.com/)

---

## .env.example
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_nft_contract_address
NEXT_PUBLIC_BATTLE_ADDRESS=your_battlearena_contract_address
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

**Steps:**

### 1. Configure Environment
```bash
cp .env.example .env.local
# Complete with actual addresses & project ID
```

### 2. Build the Frontend
```bash
cd frontend
npm install
npm run build
```
- Check for `Compiled successfully`.
- If errors, run `npm run lint` or check missing env vars.

### 3. Run Locally (to verify build)
```bash
npm run start
```

### 4. Deploy to Vercel (Production)
- Import GitHub repo at https://vercel.com/new
- Set environment vars as in `.env.local`
- Choose frontend directory as root
- Deploy

### 5. Post-deploy Checklist
- Test wallet connect, mint, feed, play, battle on BSC Testnet
- Check toasts, loading, error, and polish UX
- Share live link for review/stage

---

## 🛡️ Extra
- Use `npm run lint` and fix all issues before deploy.
- Update README.md with production URL and screenshots.
