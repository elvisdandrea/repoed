import { useCallback, useState } from "react";
import { Container } from "../composition/Container";
import { IconButton } from "../composition/IconButton";
import { PageHeader } from "../composition/PageHeader";
import { TopNav } from "../composition/TopNav";
import { FileDropArea } from "../home/filedrop/filedrop";
import { BoxSpace } from "../composition/BoxSpace";
import { UserBox } from "./user-box";
import { type Player } from "../../types/player";
import type { RepoFile } from "../../types/RepoFile";
import { TeamBox } from "./team-box";
import type { RunStats, Team } from "../../types/team";
import { postFetcher } from "../../utils/fetcher";
import { ItemsPurchasedBox } from "./items-purchased-box";
import type { ItemsPurchased } from "../../types/items";

const EditFile: React.FC = () => {

    const [fileContent, setFileContent] = useState<RepoFile | undefined>(undefined);
    const [players, setPlayers] = useState<Player[]>([]);
    const [team, setTeam] = useState<Team | undefined>(undefined);
    const [runStats, setRunStats] = useState<RunStats | undefined>(undefined);
    const [fileName, setFileName] = useState<string>("");
    const [itemsPurchased, setItemsPurchased] = useState<ItemsPurchased | undefined>(undefined);

    const handleSetFileContent = (content: Object, contentFileName: string) => {
        const newFileContent = content as RepoFile;
        setFileContent(newFileContent);
        
        const players: Player[] = Object.entries(newFileContent.playerNames.value).map(([id, name]) => ({
            playerId: id,
            playerName: name,
            playerHealth: newFileContent.dictionaryOfDictionaries.value.playerHealth[id],
            playerUpgradeHealth: newFileContent.dictionaryOfDictionaries.value.playerUpgradeHealth[id],
            playerUpgradeSpeed: newFileContent.dictionaryOfDictionaries.value.playerUpgradeSpeed[id],
            playerUpgradeStamina: newFileContent.dictionaryOfDictionaries.value.playerUpgradeStamina[id],
            playerUpgradeStrength: newFileContent.dictionaryOfDictionaries.value.playerUpgradeStrength[id],
            playerUpgradeRange: newFileContent.dictionaryOfDictionaries.value.playerUpgradeRange[id],
            playerUpgradeThrow: newFileContent.dictionaryOfDictionaries.value.playerUpgradeThrow[id],
            playerUpgradeTumbleWings: newFileContent.dictionaryOfDictionaries.value.playerUpgradeTumbleWings[id],
            playerUpgradeCrouchRest: newFileContent.dictionaryOfDictionaries.value.playerUpgradeCrouchRest[id],
            playerUpgradeMapPlayerCount: newFileContent.dictionaryOfDictionaries.value.playerUpgradeCrouchRest[id],
            playerUpgradeLaunch: newFileContent.dictionaryOfDictionaries.value.playerUpgradeLaunch[id],
            playerUpgradeExtraJump: newFileContent.dictionaryOfDictionaries.value.playerUpgradeExtraJump[id],
            playerHasCrown: newFileContent.dictionaryOfDictionaries.value.playerHasCrown[id],
        }));

        const team: Team = {
            teamName: newFileContent.teamName.value,
            dateAndTime: newFileContent.dateAndTime.value,
            timePlayed: newFileContent.timePlayed.value
        }

        const runStats: RunStats = {
            level: newFileContent.dictionaryOfDictionaries.value.runStats.level,
            currency: newFileContent.dictionaryOfDictionaries.value.runStats.currency,
            chargingStationCharge: newFileContent.dictionaryOfDictionaries.value.runStats.chargingStationCharge,
            chargingStationChargeTotal: newFileContent.dictionaryOfDictionaries.value.runStats.chargingStationChargeTotal,
            lives: newFileContent.dictionaryOfDictionaries.value.runStats.lives,
            totalHaul: newFileContent.dictionaryOfDictionaries.value.runStats.totalHaul,
            "save level": newFileContent.dictionaryOfDictionaries.value.runStats["save level"],
        }

        const itemsPurchased: ItemsPurchased = {};
        Object.entries(newFileContent.dictionaryOfDictionaries.value.itemsPurchased as ItemsPurchased).forEach(([key, value]) => {
            itemsPurchased[key as keyof ItemsPurchased] = value as number;
        });

        setPlayers(players);
        setTeam(team);
        setRunStats(runStats);
        setItemsPurchased(itemsPurchased);
        setFileName(contentFileName);
    }

    const handleSaveFile = useCallback(async () => {

        try {
            const blob = await postFetcher<Blob>(`${import.meta.env.VITE_API_URL}file-manager/savefile`, fileContent, {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: "blob",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } finally {

        }

    }, [fileContent, fileName]);

    const handleChangePlayer = useCallback((
        playerId: string, 
        field: string,
        value: number
    ) => {
        if (!fileContent) return;
        fileContent.dictionaryOfDictionaries.value[field][playerId] = value;
        handleSetFileContent(fileContent, fileName);
    }, [fileContent, setFileContent, fileName]);

    const handleChangeTeam = useCallback((
        teamFIeld: string,
        value: string
    ) => {
        if (!fileContent) return;
        fileContent[teamFIeld].value = value;
        handleSetFileContent(fileContent, fileName);
    }, [fileContent, setFileContent, fileName]);

    const handleChangeRunStats = useCallback((
        statsFIeld: string,
        value: number
    ) => {
        if (!fileContent) return;
        fileContent.dictionaryOfDictionaries.value.runStats[statsFIeld] = value;
        handleSetFileContent(fileContent, fileName);
    }, [fileContent, setFileContent, fileName]);

    const handleChangeItem = useCallback((
        itemFIeld: string,
        value: number
    ) => {
        if (!fileContent) return;
        fileContent.dictionaryOfDictionaries.value.itemsPurchased[itemFIeld] = value;
        handleSetFileContent(fileContent, fileName);
    }, [fileContent, setFileContent, fileName]);

    return (
        <Container>
            <BoxSpace>
            <PageHeader 
                title="Edit File"
                rightContent={
                    <IconButton 
                        href="#"
                        text="Save File"
                        icon="download"
                        onClick={() => handleSaveFile()}
                    />
                }
            />

            </BoxSpace>
            <TopNav leftItems={<FileDropArea handleSetFileContent={handleSetFileContent}/>} />
            <div className="row">
                <div className="col-md-6">
                    {players.length > 0 && players.map((player) => (
                    <UserBox 
                        player={player} 
                        handleChangePlayer={handleChangePlayer} 
                    />
                ))}
                </div>
                <div className="col-md-6">
                    {team && (
                        <TeamBox
                            team={team}
                            runStats={runStats}
                            handleChangeTeam={handleChangeTeam}
                            handleChangeRunStats={handleChangeRunStats}
                        />
                    )}
                    {itemsPurchased && (
                        <ItemsPurchasedBox 
                            itemsPurchased={itemsPurchased}
                            handleChangeItem={handleChangeItem}
                        />
                    )}
                </div>
            </div>
        </Container>
        
    )
}

export { EditFile }