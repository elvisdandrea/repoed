export enum TeamFields {
    teamName = "Team Name",
    dateAndTime = "Date and Time",
    timePlayed = "Time Played"
}

type Team = {
    teamName: string;
    dateAndTime: string;
    timePlayed: number;
}

export type { Team }