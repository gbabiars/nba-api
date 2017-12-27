const puppeteer = require("puppeteer");
const jsonfile = require("jsonfile");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://stats.nba.com/players/list/");

  await page.waitFor(() => !!window.stats_ptsd);
  const { players, teams } = await page.evaluate(() => window.stats_ptsd.data);

  await browser.close();

  const activePlayers = players.filter(x => x[2] === 1).map(x => ({
    id: `${x[0]}`,
    name: x[1],
    teamId: `${x[5]}`
  }));

  const activeTeams = teams.slice(teams.length - 30).map(x => ({
    id: x[0],
    shortName: x[1],
    name: x[2],
    city: x[3],
    nickname: x[4],
    conferenceId: `${x[5]}`,
    divisionId: `${x[6]}`
  }));

  jsonfile.writeFileSync(`${__dirname}/../data/players.json`, activePlayers, {
    spaces: 2
  });

  jsonfile.writeFileSync(`${__dirname}/../data/teams.json`, activeTeams, {
    spaces: 2
  });
})();
