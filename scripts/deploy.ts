import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  console.log("\n🚀 Starting ChainGotchi deployment...\n");

  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "BNB\n");

  // Deploy ChainGotchiNFT
  console.log("🐣 Deploying ChainGotchiNFT...");
  const ChainGotchiNFT = await ethers.getContractFactory("ChainGotchiNFT");
  const nftContract = await ChainGotchiNFT.deploy();
  await nftContract.waitForDeployment();
  const nftAddress = await nftContract.getAddress();
  console.log("✅ ChainGotchiNFT deployed to:", nftAddress);

  // Deploy BattleArena
  console.log("\n⚔️  Deploying BattleArena...");
  const BattleArena = await ethers.getContractFactory("BattleArena");
  const battleContract = await BattleArena.deploy(nftAddress);
  await battleContract.waitForDeployment();
  const battleAddress = await battleContract.getAddress();
  console.log("✅ BattleArena deployed to:", battleAddress);

  // Set BattleArena address in NFT contract
  console.log("\n🔗 Setting BattleArena address in NFT contract...");
  const tx = await nftContract.setBattleArena(battleAddress);
  await tx.wait();
  console.log("✅ BattleArena address set!");

  // Save deployment addresses
  const deployment = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    contracts: {
      ChainGotchiNFT: nftAddress,
      BattleArena: battleAddress,
    },
    timestamp: new Date().toISOString(),
  };

  const deploymentsFile = "deployments.json";
  let deployments: any = {};
  
  if (fs.existsSync(deploymentsFile)) {
    deployments = JSON.parse(fs.readFileSync(deploymentsFile, "utf8"));
  }
  
  deployments[deployment.chainId] = deployment;
  fs.writeFileSync(deploymentsFile, JSON.stringify(deployments, null, 2));

  console.log("\n📄 Deployment info saved to deployments.json");
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:");
  console.log("   ChainGotchiNFT:", nftAddress);
  console.log("   BattleArena:", battleAddress);
  console.log("\n🔍 Verify contracts with:");
  console.log(`   npx hardhat verify --network <network> ${nftAddress}`);
  console.log(`   npx hardhat verify --network <network> ${battleAddress} ${nftAddress}`);
  console.log("\n" + "=".repeat(60) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });
