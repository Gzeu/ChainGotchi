// In ChainGotchiNFT.sol - Add XPET token address and claimRewards

XPETToken public rewardToken;

function setRewardToken(address _xpetAddress) external onlyOwner {
    rewardToken = XPETToken(_xpetAddress);
}

function claimRewards(uint256 tokenId) external {
    require(_isOwnerOf(msg.sender, tokenId), "Not owner");
    Pet storage pet = pets[tokenId];
    require(pet.isAlive, "Pet is dead");

    uint256 rewards = pet.level * 10 * (10 ** 18); // 10 XPET per level
    rewardToken.mint(msg.sender, rewards);
    emit RewardsClaimed(tokenId, msg.sender, rewards);
}
