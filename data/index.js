const { get } = require("axios");
const _ = require("lodash");
const teams = require("./teams.json");
const players = require("./players.json");

const SEASON = "2017-18";

const getTeamById = teamId => {
  return _.find(teams, { shortName: teamId });
};

const fetchTeamRoster = teamId => {
  const uri = `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${SEASON}&TeamID=${teamId}`;
  return get(uri).then(res => res.data);
};

const normalizePlayer = player => ({
  id: `${player[12]}`,
  teamId: `${player[0]}`,
  name: player[3],
  number: player[4],
  position: player[5],
  height: player[6],
  weight: player[7],
  birth: player[8],
  age: player[9],
  years: player[10],
  school: player[11]
});

const getTeamRoster = id =>
  fetchTeamRoster(id).then(data =>
    data.resultSets[0].rowSet.map(normalizePlayer)
  );

module.exports = {
  getTeamById,
  getTeamRoster
};
