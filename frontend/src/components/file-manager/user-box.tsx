import { PlayerFields, type Player } from "../../types/player";
import { PageHeader } from "../composition/PageHeader";

interface UserBoxProps {
    player: Player;
    handleChangePlayer: (playerId: string, field: string, value: number) => void;
}

const UserBox: React.FC<UserBoxProps> = ({ 
    player, 
    handleChangePlayer
}) => {

    return (
        <div className="container-fluid">
            <div className="row" style={{padding: "10px", display: "flex", gap: "20px"}}>
                <img src="/public/img/repo.png" width={50} alt="" />
                <PageHeader 
                    title={player.playerName}
                />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className=".card border-left-primary shadow h-100 py-2 ">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">ID: {player.playerId}</div>
                                {Object.entries(PlayerFields).map(([playerField, description]) => (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{description}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <input style={{width: 60}} type="text" value={player[playerField as keyof Player]} onChange={(e) => {
                                                handleChangePlayer(player.playerId, playerField, parseInt(e.target.value) || 0);
                                            }}/>
                                        </div>
                                    </div>
                                ))}
                            </div>                            
                        </div>
                    </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export { UserBox }