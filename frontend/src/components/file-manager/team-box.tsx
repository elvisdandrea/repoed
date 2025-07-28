import { RunStatsFields, TeamFields, type RunStats, type Team } from "../../types/team";
import { PageHeader } from "../composition/PageHeader";

interface TeamBoxProps {
    team: Team | undefined,
    runStats: RunStats | undefined,
    handleChangeTeam: (
        teamField: string,
        value: string
    ) => void;
    handleChangeRunStats: (
        statsField: string,
        value: number
    ) => void;
}

const TeamBox: React.FC<TeamBoxProps> = ({ 
    team, 
    runStats,
    handleChangeTeam,
    handleChangeRunStats
}) => {

    return (
        <div className="container-fluid">
            <div className="row" style={{padding: "10px", display: "flex", gap: "20px"}}>
                <PageHeader 
                    title="Team"
                />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className=".card border-left-primary shadow h-100 py-2 ">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                {runStats && Object.entries(RunStatsFields).map(([statsField, description]) => (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{description}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" value={runStats[statsField as keyof RunStats]} onChange={(e) => {
                                                handleChangeRunStats(statsField, parseInt(e.target.value) || 0);
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
            <div className="row">
                <div className="col-md-12">
                    <div className=".card border-left-primary shadow h-100 py-2 ">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                {team && Object.entries(TeamFields).map(([teamField, description]) => (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{description}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" value={team[teamField as keyof Team]} onChange={(e) => {
                                                handleChangeTeam(teamField, e.target.value);
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

export { TeamBox }