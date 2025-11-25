import { expect } from "chai";
import { ethers } from "hardhat";
import { ChainGotchiNFT, BattleArena } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("ChainGotchi", function () {
  let nftContract: ChainGotchiNFT;
  let battleContract: BattleArena;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  const MINT_PRICE = ethers.parseEther("0.01");
  const BATTLE_FEE = ethers.parseEther("0.001");

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy contracts
    const NFT = await ethers.getContractFactory("ChainGotchiNFT");
    nftContract = await NFT.deploy();
    await nftContract.waitForDeployment();

    const Battle = await ethers.getContractFactory("BattleArena");
    battleContract = await Battle.deploy(await nftContract.getAddress());
    await battleContract.waitForDeployment();

    // Set battle arena
    await nftContract.setBattleArena(await battleContract.getAddress());
  });

  describe("Minting", function () {
    it("Should mint a pet with correct payment", async function () {
      await expect(
        nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE })
      )
        .to.emit(nftContract, "PetMinted")
        .withArgs(user1.address, 0, "TestPet");

      const pet = await nftContract.getPetStats(0);
      expect(pet.name).to.equal("TestPet");
      expect(pet.level).to.equal(1);
      expect(pet.xp).to.equal(0);
      expect(pet.hunger).to.equal(100);
      expect(pet.isAlive).to.equal(true);
    });

    it("Should reject minting without payment", async function () {
      await expect(
        nftContract.connect(user1).mintPet("TestPet")
      ).to.be.revertedWith("Insufficient BNB");
    });

    it("Should reject invalid names", async function () {
      await expect(
        nftContract.connect(user1).mintPet("", { value: MINT_PRICE })
      ).to.be.revertedWith("Invalid name length");

      await expect(
        nftContract.connect(user1).mintPet("VeryLongNameThatExceedsTwentyCharacters", { value: MINT_PRICE })
      ).to.be.revertedWith("Invalid name length");
    });
  });

  describe("Feeding", function () {
    beforeEach(async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });
    });

    it("Should feed pet and restore hunger", async function () {
      // Fast forward 5 hours to decrease hunger
      await time.increase(5 * 3600);

      await expect(nftContract.connect(user1).feedPet(0))
        .to.emit(nftContract, "PetFed");

      const pet = await nftContract.getPetStats(0);
      expect(pet.hunger).to.equal(100);
    });

    it("Should not allow non-owner to feed", async function () {
      await expect(
        nftContract.connect(user2).feedPet(0)
      ).to.be.revertedWith("Not owner");
    });

    it("Should respect feed cooldown", async function () {
      await nftContract.connect(user1).feedPet(0);
      
      await expect(
        nftContract.connect(user1).feedPet(0)
      ).to.be.revertedWith("Feed cooldown active");
    });
  });

  describe("Playing", function () {
    beforeEach(async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });
    });

    it("Should gain XP from playing", async function () {
      await expect(nftContract.connect(user1).playWithPet(0))
        .to.emit(nftContract, "PetPlayed");

      const pet = await nftContract.getPetStats(0);
      expect(pet.xp).to.be.gt(0);
    });

    it("Should respect play cooldown", async function () {
      await nftContract.connect(user1).playWithPet(0);
      
      await expect(
        nftContract.connect(user1).playWithPet(0)
      ).to.be.revertedWith("Play cooldown active");
    });
  });

  describe("Leveling", function () {
    it("Should level up after gaining enough XP", async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });

      // Play multiple times to gain XP
      for (let i = 0; i < 10; i++) {
        await time.increase(3600); // 1 hour
        await nftContract.connect(user1).playWithPet(0);
      }

      const pet = await nftContract.getPetStats(0);
      expect(pet.level).to.be.gt(1);
    });

    it("Should evolve at correct levels", async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });

      // Simulate gaining XP to level 5 (Baby evolution)
      for (let i = 0; i < 50; i++) {
        await time.increase(3600);
        await nftContract.connect(user1).playWithPet(0);
      }

      const pet = await nftContract.getPetStats(0);
      expect(pet.evolution).to.be.gte(1); // At least Baby
    });
  });

  describe("Death", function () {
    it("Should die when hunger reaches 0", async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });

      // Fast forward 24 hours (hunger decay)
      await time.increase(24 * 3600);

      const pet = await nftContract.getPetStats(0);
      expect(pet.isAlive).to.equal(false);
      expect(pet.hunger).to.equal(0);
    });

    it("Should not allow interactions with dead pet", async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });

      // Kill pet
      await time.increase(24 * 3600);
      await nftContract.connect(user1).feedPet(0); // This will update status

      await expect(
        nftContract.connect(user1).playWithPet(0)
      ).to.be.revertedWith("Pet is dead");
    });
  });

  describe("Battles", function () {
    beforeEach(async function () {
      // Mint pets and level them up to 5+
      await nftContract.connect(user1).mintPet("Pet1", { value: MINT_PRICE });
      await nftContract.connect(user2).mintPet("Pet2", { value: MINT_PRICE });

      // Level up both pets
      for (let i = 0; i < 30; i++) {
        await time.increase(3600);
        await nftContract.connect(user1).playWithPet(0);
        await nftContract.connect(user2).playWithPet(1);
      }
    });

    it("Should create a battle", async function () {
      await expect(
        battleContract.connect(user1).createBattle(0, { value: BATTLE_FEE })
      )
        .to.emit(battleContract, "BattleCreated");
    });

    it("Should join and complete a battle", async function () {
      await battleContract.connect(user1).createBattle(0, { value: BATTLE_FEE });

      await expect(
        battleContract.connect(user2).joinBattle(0, 1, { value: BATTLE_FEE })
      )
        .to.emit(battleContract, "BattleEnded");

      const battle = await battleContract.battles(0);
      expect(battle.isActive).to.equal(false);
      expect(battle.winner).to.be.oneOf([BigInt(0), BigInt(1)]);
    });

    it("Should not allow low level pets to battle", async function () {
      await nftContract.connect(user1).mintPet("LowLevel", { value: MINT_PRICE });
      
      await expect(
        battleContract.connect(user1).createBattle(2, { value: BATTLE_FEE })
      ).to.be.revertedWith("Pet must be level 5+");
    });
  });

  describe("Ownership", function () {
    it("Should withdraw contract balance", async function () {
      await nftContract.connect(user1).mintPet("TestPet", { value: MINT_PRICE });
      
      const balanceBefore = await ethers.provider.getBalance(owner.address);
      await nftContract.connect(owner).withdraw();
      const balanceAfter = await ethers.provider.getBalance(owner.address);

      expect(balanceAfter).to.be.gt(balanceBefore);
    });
  });
});
