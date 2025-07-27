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
import type { Team } from "../../types/team";

const EditFile: React.FC = () => {

    const [fileContent, setFileContent] = useState<RepoFile | undefined>(undefined);
    const [players, setPlayers] = useState<Player[]>([]);
    const [team, setTeam] = useState<Team | undefined>(undefined);

    const handleSetFileContent = (content: Object) => {
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

        setPlayers(players);
        setTeam(team);
    }

    const handleSaveFile = useCallback(() => {

    }, []);

    const handleChangePlayer = useCallback((
        playerId: string, 
        field: string,
        value: number
    ) => {
        if (!fileContent) return;
        fileContent.dictionaryOfDictionaries.value[field][playerId] = value;
        handleSetFileContent(fileContent);
    }, [fileContent, setFileContent]);

    const handleChangeTeam = useCallback((
        teamFIeld: string,
        value: string
    ) => {
        if (!fileContent) return;
        fileContent[teamFIeld].value = value;
        handleSetFileContent(fileContent);
    }, [fileContent, setFileContent]);

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
                            handleChangeTeam={handleChangeTeam}
                        />
                    )}
                </div>
            </div>
        </Container>
        
    )
}

export { EditFile }