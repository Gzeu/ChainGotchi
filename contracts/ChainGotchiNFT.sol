// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ChainGotchiNFT
 * @dev Evolving NFT pets with XP system, hunger mechanics, and permadeath
 */
contract ChainGotchiNFT is ERC721, ERC721Enumerable, Ownable {
    using Strings for uint256;

    // Pet structure
    struct Pet {
        uint256 id;
        string name;
        uint256 birthTime;
        uint256 xp;
        uint256 level;
        uint256 hunger; // 0-100
        uint256 happiness; // 0-100
        uint256 lastFed;
        uint256 lastPlayed;
        uint8 evolution; // 0=Egg, 1=Baby, 2=Teen, 3=Adult, 4=Master
        uint256 wins;
        uint256 losses;
        bool isAlive;
    }

    // Storage
    mapping(uint256 => Pet) public pets;
    mapping(address => uint256[]) private ownerPets;
    uint256 private nextTokenId;
    address public battleArena;

    // Constants
    uint256 public constant MINT_PRICE = 0.01 ether;
    uint256 public constant XP_TO_LEVEL = 100;
    uint256 public constant HUNGER_DECAY_RATE = 5; // per hour
    uint256 public constant PLAY_COOLDOWN = 1 hours;
    uint256 public constant FEED_COOLDOWN = 2 hours;

    // Events
    event PetMinted(address indexed owner, uint256 indexed tokenId, string name);
    event PetFed(uint256 indexed tokenId, uint256 newHunger, uint256 timestamp);
    event PetPlayed(uint256 indexed tokenId, uint256 xpGained, uint256 newXP);
    event LevelUp(uint256 indexed tokenId, uint256 newLevel);
    event Evolution(uint256 indexed tokenId, uint8 newEvolution);
    event PetDied(uint256 indexed tokenId, uint256 timestamp);
    event BattleResult(uint256 indexed tokenId, bool won, uint256 xpGained);

    constructor() ERC721("ChainGotchi", "CGOTCHI") Ownable(msg.sender) {}

    /**
     * @dev Mint a new pet
     * @param _name Pet name (max 20 characters)
     */
    function mintPet(string memory _name) external payable {
        require(msg.value >= MINT_PRICE, "Insufficient BNB");
        require(bytes(_name).length > 0 && bytes(_name).length <= 20, "Invalid name length");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);

        pets[tokenId] = Pet({
            id: tokenId,
            name: _name,
            birthTime: block.timestamp,
            xp: 0,
            level: 1,
            hunger: 100,
            happiness: 100,
            lastFed: block.timestamp,
            lastPlayed: block.timestamp,
            evolution: 0, // Egg
            wins: 0,
            losses: 0,
            isAlive: true
        });

        ownerPets[msg.sender].push(tokenId);
        emit PetMinted(msg.sender, tokenId, _name);
    }

    /**
     * @dev Feed your pet to restore hunger
     * @param tokenId Pet token ID
     */
    function feedPet(uint256 tokenId) external {
        require(_isOwnerOf(msg.sender, tokenId), "Not owner");
        Pet storage pet = pets[tokenId];
        require(pet.isAlive, "Pet is dead");
        require(block.timestamp >= pet.lastFed + FEED_COOLDOWN, "Feed cooldown active");

        _updateHunger(tokenId);
        
        if (!pet.isAlive) {
            return; // Pet died during hunger update
        }

        pet.hunger = 100;
        pet.happiness = _min(pet.happiness + 10, 100);
        pet.lastFed = block.timestamp;

        // Small XP reward for caring
        _addXP(tokenId, 5);

        emit PetFed(tokenId, pet.hunger, block.timestamp);
    }

    /**
     * @dev Play with your pet to earn XP
     * @param tokenId Pet token ID
     */
    function playWithPet(uint256 tokenId) external {
        require(_isOwnerOf(msg.sender, tokenId), "Not owner");
        Pet storage pet = pets[tokenId];
        require(pet.isAlive, "Pet is dead");
        require(block.timestamp >= pet.lastPlayed + PLAY_COOLDOWN, "Play cooldown active");

        _updateHunger(tokenId);
        
        if (!pet.isAlive) {
            return; // Pet died during hunger update
        }

        uint256 xpGained = 10 + (pet.level * 2);
        _addXP(tokenId, xpGained);

        pet.happiness = _min(pet.happiness + 5, 100);
        pet.lastPlayed = block.timestamp;

        emit PetPlayed(tokenId, xpGained, pet.xp);
    }

    /**
     * @dev Update battle results (only callable by BattleArena contract)
     * @param tokenId Pet token ID
     * @param won Whether the pet won
     */
    function updateBattleResult(uint256 tokenId, bool won) external {
        require(msg.sender == battleArena, "Only BattleArena");
        Pet storage pet = pets[tokenId];
        require(pet.isAlive, "Pet is dead");

        if (won) {
            pet.wins++;
            _addXP(tokenId, 100);
            emit BattleResult(tokenId, true, 100);
        } else {
            pet.losses++;
            _addXP(tokenId, 20); // Consolation XP
            emit BattleResult(tokenId, false, 20);
        }
    }

    /**
     * @dev Add XP and check for level up
     * @param tokenId Pet token ID
     * @param amount XP amount to add
     */
    function _addXP(uint256 tokenId, uint256 amount) internal {
        Pet storage pet = pets[tokenId];
        pet.xp += amount;

        // Check for level up
        uint256 requiredXP = pet.level * XP_TO_LEVEL;
        while (pet.xp >= requiredXP) {
            pet.level++;
            pet.xp -= requiredXP;
            requiredXP = pet.level * XP_TO_LEVEL;

            emit LevelUp(tokenId, pet.level);
            _checkEvolution(tokenId);
        }
    }

    /**
     * @dev Check and trigger evolution
     * @param tokenId Pet token ID
     */
    function _checkEvolution(uint256 tokenId) internal {
        Pet storage pet = pets[tokenId];
        uint8 newEvolution = pet.evolution;

        if (pet.level >= 50 && pet.evolution < 4) {
            newEvolution = 4; // Master
        } else if (pet.level >= 30 && pet.evolution < 3) {
            newEvolution = 3; // Adult
        } else if (pet.level >= 15 && pet.evolution < 2) {
            newEvolution = 2; // Teen
        } else if (pet.level >= 5 && pet.evolution < 1) {
            newEvolution = 1; // Baby
        }

        if (newEvolution > pet.evolution) {
            pet.evolution = newEvolution;
            emit Evolution(tokenId, newEvolution);
        }
    }

    /**
     * @dev Update hunger based on time passed
     * @param tokenId Pet token ID
     */
    function _updateHunger(uint256 tokenId) internal {
        Pet storage pet = pets[tokenId];
        
        if (!pet.isAlive) return;

        uint256 hoursPassed = (block.timestamp - pet.lastFed) / 3600;
        uint256 hungerDecay = hoursPassed * HUNGER_DECAY_RATE;

        if (hungerDecay >= pet.hunger) {
            pet.hunger = 0;
            pet.isAlive = false;
            emit PetDied(tokenId, block.timestamp);
        } else {
            pet.hunger -= hungerDecay;
        }
    }

    /**
     * @dev Get pet stats with updated hunger
     * @param tokenId Pet token ID
     */
    function getPetStats(uint256 tokenId) external view returns (Pet memory) {
        Pet memory pet = pets[tokenId];
        
        if (pet.isAlive) {
            // Calculate current hunger without modifying state
            uint256 hoursPassed = (block.timestamp - pet.lastFed) / 3600;
            uint256 hungerDecay = hoursPassed * HUNGER_DECAY_RATE;
            
            if (hungerDecay >= pet.hunger) {
                pet.hunger = 0;
                pet.isAlive = false;
            } else {
                pet.hunger -= hungerDecay;
            }
        }
        
        return pet;
    }

    /**
     * @dev Get all pets owned by address
     * @param owner Address to query
     */
    function getOwnerPets(address owner) external view returns (uint256[] memory) {
        return ownerPets[owner];
    }

    /**
     * @dev Set BattleArena contract address
     * @param _battleArena BattleArena contract address
     */
    function setBattleArena(address _battleArena) external onlyOwner {
        battleArena = _battleArena;
    }

    /**
     * @dev Withdraw contract balance
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @dev Check if address owns token
     */
    function _isOwnerOf(address account, uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) == account;
    }

    /**
     * @dev Helper function for min value
     */
    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    // Override required functions
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        Pet memory pet = pets[tokenId];
        string memory evolutionStage = _getEvolutionName(pet.evolution);
        
        // Return base URI with metadata
        return string(abi.encodePacked(
            "https://chaingotchi.app/api/metadata/",
            tokenId.toString(),
            "?evolution=",
            uint256(pet.evolution).toString(),
            "&level=",
            pet.level.toString()
        ));
    }

    function _getEvolutionName(uint8 evolution) internal pure returns (string memory) {
        if (evolution == 0) return "Egg";
        if (evolution == 1) return "Baby";
        if (evolution == 2) return "Teen";
        if (evolution == 3) return "Adult";
        return "Master";
    }
}
