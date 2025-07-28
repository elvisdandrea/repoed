export enum TeamFields {
    teamName = "Team Name",
    dateAndTime = "Date and Time",
    timePlayed = "Time Played"
}

export enum RunStatsFields {
    "level" = "Level",
    "currency" = "Currency",
    "lives" = "Lives",
    "chargingStationCharge" = "Charging Station Charge",
    "chargingStationChargeTotal" = "Charging Station Charge Total",
    "totalHaul" = "Total Haul",
    "save level" = "Save Level"
}

type Team = {
    teamName: string;
    dateAndTime: string;
    timePlayed: number;
}

type RunStats = {
        "level": number,
        "currency": number,
        "lives": number,
        "chargingStationCharge": number,
        "chargingStationChargeTotal": number,
        "totalHaul": number,
        "save level": number
}

export type { Team, RunStats }