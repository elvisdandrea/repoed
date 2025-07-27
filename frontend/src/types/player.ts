export enum PlayerFields {
    "playerHealth" = "Player Health",
    "playerUpgradeHealth" = "Upgrade Health",
    "playerUpgradeStamina" = "Upgrade Stamina",
    "playerUpgradeExtraJump" = "Upgrade Extra Jump",
    "playerUpgradeLaunch" = "Upgrade Launch",
    "playerUpgradeMapPlayerCount" = "Upgrade Map Player Count",
    "playerUpgradeSpeed" = "Upgrade Speed",
    "playerUpgradeStrength" = "Upgrade Strength",
    "playerUpgradeRange" = "Upgrade Range",
    "playerUpgradeThrow" = "Upgrade Throw",
    "playerUpgradeCrouchRest" = "Upgrade Crouch Rest",
    "playerUpgradeTumbleWings" = "Upgrade Tumble Wings",
    "playerHasCrown" = "Has Crown",
    
}

type Player = {
    playerName: string;
    playerId: string;
    playerHealth?: number,
    playerUpgradeHealth?: number,
    playerUpgradeStamina?: number,
    playerUpgradeExtraJump?: number,
    playerUpgradeLaunch?: number,
    playerUpgradeMapPlayerCount?: number,
    playerUpgradeSpeed?: number,
    playerUpgradeStrength?: number,
    playerUpgradeRange?: number,
    playerUpgradeThrow?: number,
    playerUpgradeCrouchRest?: number,
    playerUpgradeTumbleWings?: number,
    playerHasCrown?: number,
}

export type { Player }