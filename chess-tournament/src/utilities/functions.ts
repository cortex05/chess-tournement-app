export const handleGameTypeDisplay = (gameType: string) => {
  switch (gameType) {
    case "FFA":
      return "Free-For-All";
    case "TEAM":
      return "Team Tournament";
  }
};

// export const handlePluralTournament = (title: string) => {

// }