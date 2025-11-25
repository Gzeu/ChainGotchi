// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ChainGotchiNFT.sol";

/**
 * @title BattleArena
 * @dev PvP battle system for ChainGotchi pets
 */
contract BattleArena {
    ChainGotchiNFT public nftContract;

    struct Battle {
        uint256 pet1;
        uint256 pet2;
        address challenger;
        address opponent;
        bool isActive;
        uint256 winner;
        uint256 createdAt;
    }

    mapping(uint256 => Battle) public battles;
    mapping(uint256 => uint256) public petLastBattle; // Cooldown tracking
    uint256 public nextBattleId;
    uint256 public constant BATTLE_COOLDOWN = 1 hours;
    uint256 public constant BATTLE_ENTRY_FEE = 0.001 ether;

    event BattleCreated(uint256 indexed battleId, uint256 indexed pet1, address indexed challenger);
    event BattleJoined(uint256 indexed battleId, uint256 indexed pet2, address indexed opponent);
    event BattleEnded(uint256 indexed battleId, uint256 indexed winner, uint256 indexed loser);

    constructor(address _nftContract) {
        nftContract = ChainGotchiNFT(_nftContract);
    }

    /**
     * @dev Create a new battle
     * @param petId Your pet's token ID
     */
    function createBattle(uint256 petId) external payable {
        require(msg.value >= BATTLE_ENTRY_FEE, "Insufficient entry fee");
        require(nftContract.ownerOf(petId) == msg.sender, "Not owner");
        require(block.timestamp >= petLastBattle[petId] + BATTLE_COOLDOWN, "Battle cooldown active");

        ChainGotchiNFT.Pet memory pet = nftContract.getPetStats(petId);
        require(pet.isAlive, "Pet is dead");
        require(pet.level >= 5, "Pet must be level 5+");

        uint256 battleId = nextBattleId++;
        battles[battleId] = Battle({
            pet1: petId,
            pet2: 0,
            challenger: msg.sender,
            opponent: address(0),
            isActive: true,
            winner: 0,
            createdAt: block.timestamp
        });

        petLastBattle[petId] = block.timestamp;
        emit BattleCreated(battleId, petId, msg.sender);
    }

    /**
     * @dev Join an existing battle
     * @param battleId Battle to join
     * @param petId Your pet's token ID
     */
    function joinBattle(uint256 battleId, uint256 petId) external payable {
        require(msg.value >= BATTLE_ENTRY_FEE, "Insufficient entry fee");
        Battle storage battle = battles[battleId];
        require(battle.isActive, "Battle not active");
        require(battle.opponent == address(0), "Battle already joined");
        require(nftContract.ownerOf(petId) == msg.sender, "Not owner");
        require(msg.sender != battle.challenger, "Cannot battle yourself");
        require(block.timestamp >= petLastBattle[petId] + BATTLE_COOLDOWN, "Battle cooldown active");

        ChainGotchiNFT.Pet memory pet = nftContract.getPetStats(petId);
        require(pet.isAlive, "Pet is dead");
        require(pet.level >= 5, "Pet must be level 5+");

        battle.pet2 = petId;
        battle.opponent = msg.sender;
        petLastBattle[petId] = block.timestamp;

        emit BattleJoined(battleId, petId, msg.sender);

        // Execute battle immediately
        _executeBattle(battleId);
    }

    /**
     * @dev Execute battle logic
     * @param battleId Battle ID to execute
     */
    function _executeBattle(uint256 battleId) internal {
        Battle storage battle = battles[battleId];

        ChainGotchiNFT.Pet memory pet1 = nftContract.getPetStats(battle.pet1);
        ChainGotchiNFT.Pet memory pet2 = nftContract.getPetStats(battle.pet2);

        // Calculate battle power
        uint256 power1 = _calculatePower(pet1);
        uint256 power2 = _calculatePower(pet2);

        // Add randomness based on block data
        uint256 random = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            battle.pet1,
            battle.pet2
        ))) % 100;

        uint256 winner;
        uint256 loser;

        if (power1 + random > power2) {
            winner = battle.pet1;
            loser = battle.pet2;
            payable(battle.challenger).transfer(BATTLE_ENTRY_FEE * 2);
        } else {
            winner = battle.pet2;
            loser = battle.pet1;
            payable(battle.opponent).transfer(BATTLE_ENTRY_FEE * 2);
        }

        battle.winner = winner;
        battle.isActive = false;

        // Update NFT contract with battle results
        nftContract.updateBattleResult(winner, true);
        nftContract.updateBattleResult(loser, false);

        emit BattleEnded(battleId, winner, loser);
    }

    /**
     * @dev Calculate pet battle power
     * @param pet Pet stats
     */
    function _calculatePower(ChainGotchiNFT.Pet memory pet) internal pure returns (uint256) {
        return (pet.level * pet.happiness) + (pet.xp / 10);
    }

    /**
     * @dev Get active battles (last 50)
     */
    function getActiveBattles() external view returns (Battle[] memory) {
        uint256 count = 0;
        
        // Count active battles
        for (uint256 i = 0; i < nextBattleId && count < 50; i++) {
            if (battles[i].isActive && battles[i].opponent == address(0)) {
                count++;
            }
        }

        Battle[] memory activeBattles = new Battle[](count);
        uint256 index = 0;

        // Populate array
        for (uint256 i = 0; i < nextBattleId && index < count; i++) {
            if (battles[i].isActive && battles[i].opponent == address(0)) {
                activeBattles[index] = battles[i];
                index++;
            }
        }

        return activeBattles;
    }

    /**
     * @dev Get battle history for an address (last 20)
     */
    function getBattleHistory(address player) external view returns (Battle[] memory) {
        uint256 count = 0;
        
        // Count player's battles
        for (uint256 i = 0; i < nextBattleId && count < 20; i++) {
            if (!battles[i].isActive && 
                (battles[i].challenger == player || battles[i].opponent == player)) {
                count++;
            }
        }

        Battle[] memory history = new Battle[](count);
        uint256 index = 0;

        // Populate array
        for (uint256 i = 0; i < nextBattleId && index < count; i++) {
            if (!battles[i].isActive && 
                (battles[i].challenger == player || battles[i].opponent == player)) {
                history[index] = battles[i];
                index++;
            }
        }

        return history;
    }
}
